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

async function getById(employee_id) {
    return await Employee.findOne({ employee_id: employee_id });
}

async function create(employeeParam) {
    if (
        await Employee.findOne({ employee_email: employeeParam.employee_email })
    ) {
        throw new Error(
            "Email '" + employeeParam.employee_email + "' is already taken"
        );
    }
    const employee = new Employee(employeeParam);
    if (employeeParam.password) {
        employee.password = bcrypt.hashSync(employeeParam.password, 10);
    }
    await employee.save();
}

async function update(employee_id, employeeParam) {
    const employee = await Employee.findById({ employee_id: employee_id });

    if (!employee) throw new Error("Employee not found");
    if (
        employee.employee_email !== employeeParam.employee_email &&
        (await Employee.findOne({
            employee_email: employeeParam.employee_email,
        }))
    ) {
        throw new Error(
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

async function _delete(employee_id) {
    await Employee.findByIdAndRemove({ employee_id: employee_id });
}
