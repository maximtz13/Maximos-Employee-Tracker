const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const figlet = require('figlet');
const { departments, roles, employees } = require('./util/queries');

db.connect(err => {
    if (err) throw err;
});

const begin = () => {
    console.log(figlet.textSync(`Employee
    Manager`));
    console.log('');
    promptUser();
}

const promptUser = () => {

    inquirer.prompt({
        type: 'list',
        name: 'mainMenu',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee Role',
            'Quit Application'
        ]
    })
        .then(({ mainMenu }) => {
            switch (mainMenu) {
                case 'View All Departments':
                    departments.viewAll()
                        .then(() => promptUser());
                    break;
                case 'View All Roles':
                    roles.viewAll()
                        .then(() => promptUser());
                    break;
                case 'View All Employees':
                    employees.viewAll()
                        .then(() => promptUser());
                    break;
                case 'Add Department':
                    inquirer.prompt({
                        type: 'text',
                        name: 'name',
                        message: "What is the department's name?"
                    }).then(({ name }) => {
                        departments.add([name])
                            .then(() => promptUser());
                    });
                    break;
                case 'Add Role':
                    departments.getDepartments().then((departmentArray) => {
                        inquirer.prompt([
                            {
                                type: 'text',
                                name: 'title',
                                message: "What is the job title?"
                            },
                            {
                                type: 'number',
                                name: 'salary',
                                message: 'What is the salary for this position?'
                            },
                            {
                                type: 'list',
                                name: 'department_id',
                                message: "What department does this role belong to?",
                                choices: departmentArray.sort(function (a, b) {
                                    if (a.name < b.name) { return -1; }
                                    if (a.name > b.name) { return 1; }
                                    return 0;
                                })
                            }
                        ]).then(({ title, salary, department_id }) => {
                            roles.add([title, salary, department_id])
                                .then(() => promptUser());
                        });
                    });
                    break;
                case 'Add Employee':
                    employees.getNames().then((employeeArray) => {
                        roles.getTitles().then((titleArray) => {
                            inquirer.prompt([
                                {
                                    type: 'text',
                                    name: 'first_name',
                                    message: "What is the employee's first name?"
                                },
                                {
                                    type: 'text',
                                    name: 'last_name',
                                    message: "What is the employee's last name?"
                                },
                                {
                                    type: 'list',
                                    name: 'role_id',
                                    message: "What is this employee's title?",
                                    choices: titleArray.sort(function (a, b) {
                                        if (a.name < b.name) { return -1; }
                                        if (a.name > b.name) { return 1; }
                                        return 0;
                                    })
                                },
                                {
                                    type: 'confirm',
                                    name: 'confirmManager',
                                    message: 'Does this employee have a manager?',
                                    default: true
                                },
                                {
                                    type: 'list',
                                    name: 'manager_id',
                                    message: "Who is this employee's manager?",
                                    choices: employeeArray.sort(function (a, b) {
                                        if (a.name < b.name) { return -1; }
                                        if (a.name > b.name) { return 1; }
                                        return 0;
                                    }),
                                    when: ({ confirmManager }) => {
                                        if (confirmManager) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                }
                            ]).then(({ first_name, last_name, role_id, manager_id }) => {
                                employees.add([first_name, last_name, role_id, manager_id])
                                    .then(() => promptUser());
                            });
                        })
                    });
                    break;
                case 'Update Employee Role':
                    employees.getNames().then((employeeArray) => {
                        roles.getTitles().then((titleArray) => {
                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'employee_id',
                                    message: "Which employee would you like to update?",
                                    choices: employeeArray.sort(function (a, b) {
                                        if (a.name < b.name) { return -1; }
                                        if (a.name > b.name) { return 1; }
                                        return 0;
                                    })
                                },
                                {
                                    type: 'list',
                                    name: 'role_id',
                                    message: "What is this employee's updated title?",
                                    choices: titleArray.sort(function (a, b) {
                                        if (a.name < b.name) { return -1; }
                                        if (a.name > b.name) { return 1; }
                                        return 0;
                                    })
                                }
                            ]).then(({ employee_id, role_id }) => {
                                employees.update([role_id, employee_id])
                                    .then(() => promptUser());
                            });
                        })
                    });
                    break;
                case 'Quit Application':
                    db.end();
                    break;
            }
        });
};

begin();