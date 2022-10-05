const db = require('../db/connection');

class SqlMethods {
    constructor(getAll, addOne) {
        this.getAll = getAll;
        this.addOne = addOne;
    }

    viewAll() {
        return db.promise().query(this.getAll)
            .then(([rows, fields]) => {
                console.log('');
                return console.table(rows);
            })
            .catch(console.log);
    }

    add(params) {
        return db.promise().query(this.addOne, params)
            .then(() => {
                console.log('');
                console.log(`${params[0]} was successfully added.`)
                console.log('');
            })

            .catch(console.log);
    }
}

class DepartmentMethods extends SqlMethods {
    constructor(getAll, addOne) {
        super(getAll, addOne);
    }

    getDepartments() {
        return db.promise().query(this.getAll)
            .then(([rows, fields]) => {
                let departments = rows.map(department => ({
                    name: department.name,
                    value: department.id
                }))
                return departments;
            })
    }
}

class RoleMethods extends SqlMethods {
    constructor(getAll, addOne) {
        super(getAll, addOne);
    }

    getTitles() {
        return db.promise().query(this.getAll)
            .then(([rows, fields]) => {
                let titles = rows.map(role => ({
                    name: role.title,
                    value: role.id
                }))
                return titles;
            })
    }
}

class EmployeeMethods extends SqlMethods {
    constructor(getAll, addOne, updateRole) {
        super(getAll, addOne);

        this.updateRole = updateRole;
    }

    getNames() {
        return db.promise().query(this.getAll)
            .then(([rows, fields]) => {
                let employeeNames = rows.map(employee => ({
                    name: employee.first_name + ' ' + employee.last_name,
                    value: employee.id
                }))
                return employeeNames;
            })
    };

    update(params) {
        return db.promise().query(this.updateRole, params)
            .then(() => {
                console.log('');
                console.log(`Update was successful.`)
                console.log('');
            })
    };

};


const departments = new DepartmentMethods(`SELECT
    departments.name,
    departments.id
    FROM departments;`,
    `INSERT INTO departments (name) VALUES (?)`);

const roles = new RoleMethods(`SELECT
    roles.title,
    roles.id,
    departments.name AS department,
    roles.salary
    FROM roles
    LEFT JOIN departments ON roles.department_id = departments.id;`,
    `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`);

const employees = new EmployeeMethods(`SELECT
    employees.id,
    employees.first_name,
    employees.last_name,
    roles.title AS 'job title',
    departments.name AS department,
    roles.salary,
    CONCAT(managers.first_name, ' ', managers.last_name) AS manager
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees as managers ON employees.manager_id = managers.id;`,
    `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
    `UPDATE employees SET role_id = ? WHERE id = ?`);

module.exports = { departments, roles, employees };