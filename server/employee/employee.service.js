const bcrypt = require("bcryptjs");
const db = require("../_helpers/db");
const Employee = db.Employee;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

async function getAll() {
    return await Employee.find();
}

async function getById(id) {
    return await Employee.findById(id);
}

async function create(employeeParam) {
    // validate
    if (
        await Employee.findOne({ employee_email: employeeParam.employee_email })
    ) {
        throw "Email '" + employeeParam.employee_email + "' is already taken";
    }
    const employee = new Employee(employeeParam);
    if (employeeParam.password) {
        employee.password = bcrypt.hashSync(employeeParam.password, 10);
    }

    // save employee
    await employee.save();
}

async function update(id, employeeParam) {
    const employee = await Employee.findById(id);

    // validate
    if (!employee) throw "Employee not found";
    if (
        employee.employee_email !== employeeParam.employee_email &&
        (await Employee.findOne({
            employee_email: employeeParam.employee_email,
        }))
    ) {
        throw (
            'Employee Email "' +
            employeeParam.employee_email +
            '" is already taken'
        );
    }

    if (employeeParam.password) {
        employeeParam.password = bcrypt.hashSync(employeeParam.password, 10);
    }

    Object.assign(employee, employeeParam);

    await employee.save();
}

async function _delete(id) {
    await Employee.findByIdAndRemove(id);
}
