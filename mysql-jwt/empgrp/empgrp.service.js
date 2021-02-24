const db = require("_helpers/db");
const { QueryTypes } = require("sequelize");

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

async function getAll() {
    return await db.EmpGrp.findAll();
    // return db.sequelize.query("SELECT * FROM `empgrps`", {
    //     type: QueryTypes.SELECT,
    // });
}

async function getById(empgrp_id) {
    return await getEmpGrp(empgrp_id);
}

async function create(params) {
    await db.EmpGrp.create(params);
}

async function update(empgrp_id, params) {
    const empgrp = await getEmpGrp(empgrp_id);
    Object.assign(empgrp, params);
    await empgrp.save();
}

async function _delete(empgrp_id) {
    const empgrp = await getEmpGrp(empgrp_id);
    await empgrp.destroy();
}

async function getEmpGrp(empgrp_id) {
    const empgrp = await db.EmpGrp.findByPk(empgrp_id);
    if (!empgrp) throw "EmpGrp not found";
    return empgrp;
}
