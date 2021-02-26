const bcrypt = require("bcryptjs");
const db = require("../_helpers/db");
const { QueryTypes } = require("sequelize");

module.exports = {
    getAll,
    getById,
    getByGroupName,
    create,
    update,
    delete: _delete,
};

async function getAll() {
    return await db.Employee.findAll();
    // return db.sequelize.query("SELECT * FROM `employees`", {
    //     type: QueryTypes.SELECT,
    // });
}

async function getById(employee_id) {
    return await getEmployee(employee_id);
}

async function getByGroupName(group_name) {
    let query = `
    SELECT group_name, employee_name, threshold
    FROM employees 
    LEFT JOIN empgrps ON (employees.employee_id=empgrps.employee_id)
    LEFT JOIN leave_tracker_test.groups ON (leave_tracker_test.groups.group_id=empgrps.group_id)
    where leave_tracker_test.groups.group_name = ${group_name};
    `;
    console.log(query);
    return await db.sequelize.query(query, { type: QueryTypes.SELECT });
}

async function create(params) {
    // validate
    if (
        await db.Employee.findOne({
            where: { employee_email: params.employee_email },
        })
    ) {
        throw 'Email "' + params.employee_email + '" is already taken';
    }

    // hash password
    if (params.employee_password) {
        params.employee_password = await bcrypt.hash(
            params.employee_password,
            10
        );
    }

    // save employee
    await db.Employee.create(params);
}

async function update(employee_id, params) {
    const employee = await getEmployee(employee_id);

    // validate
    const employeenameChanged =
        params.employee_email &&
        employee.employee_email !== params.employee_email;
    if (
        employeenameChanged &&
        (await db.Employee.findOne({
            where: { employee_email: params.employee_email },
        }))
    ) {
        throw 'Employeename "' + params.employee_email + '" is already taken';
    }

    // hash password if it was entered
    if (params.employee_password) {
        params.employee_password = await bcrypt.hash(
            params.employee_password,
            10
        );
    }

    // copy params to employee and save
    Object.assign(employee, params);
    await employee.save();

    return omitHash(employee.get());
}

async function _delete(employee_id) {
    const employee = await getEmployee(employee_id);
    await employee.destroy();
}

// helper functions

async function getEmployee(employee_id) {
    const employee = await db.Employee.findByPk(employee_id);
    if (!employee) throw "Employee not found";
    return employee;
}

function omitHash(employee) {
    const { hash, ...employeeWithoutHash } = employee;
    return employeeWithoutHash;
}
