const db = require("../_helpers/db");
const { QueryTypes } = require("sequelize");

module.exports = {
    getAll,
    getById,
    getByName,
    create,
    update,
    delete: _delete,
};

async function getAll() {
    return await db.Leave.findAll();
    // return db.sequelize.query("SELECT * FROM `leaves`", {
    //     type: QueryTypes.SELECT,
    // });
}

async function getById(leave_id) {
    return await getLeave(leave_id);
}

async function getByName(employee_name) {
    return await db.sequelize.query(
        "SELECT * FROM leaves WHERE employee_id in(SELECT employee_id FROM employees where employee_name = '" +
            employee_name +
            "');",
        {
            type: QueryTypes.SELECT,
        }
    );
}

async function create(params) {
    await db.Leave.create(params);
}

async function update(leave_id, params) {
    const leave = await getLeave(leave_id);

    Object.assign(leave, params);
    await leave.save();
}

async function _delete(leave_id) {
    const leave = await getLeave(leave_id);
    await leave.destroy();
}

async function getLeave(leave_id) {
    const leave = await db.Leave.findByPk(leave_id);
    if (!leave) throw "Leave not found";
    return leave;
}
