const db = require('./db/connection');

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
