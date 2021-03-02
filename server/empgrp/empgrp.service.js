const db = require("../_helpers/db");
const { QueryTypes } = require("sequelize");

module.exports = {
    getAll,
    getById,
    getTotalGroupEmployee,
    create,
    update,
    delete: _delete,
};

async function getAll() {
    return await db.EmpGrp.findAll();
}

async function getById(empgrp_id) {
    return await getEmpGrp(empgrp_id);
}

async function getTotalGroupEmployee() {
    let query = `
    SELECT eg.group_id, g.group_name, count(eg.group_id) FROM empgrps eg, ltdb.groups g WHERE eg.group_id = g.group_id GROUP BY group_id;
    `;
    return db.sequelize.query(query, {
        type: QueryTypes.SELECT,
    });
}

async function create(params) {
    await db.EmpGrp.create(params);
}

async function update(empgrp_id, params) {
    const empgrp = await getEmpGrp(empgrp_id);
    Object.assign(empgrp, params);
    await empgrp.save();
}

async function _delete(employee_id, group_id) {
    let result = await db.EmpGrp.findAll({
        where: {
            employee_id: employee_id,
            group_id: group_id,
        },
    });
    if (result.length !== 0) {
        return db.EmpGrp.destroy({
            where: {
                employee_id: employee_id,
                group_id: group_id,
            },
        });
    } else {
        throw "Empgrp not found";
    }
}

async function getEmpGrp(empgrp_id) {
    const empgrp = await db.EmpGrp.findByPk(empgrp_id);
    if (!empgrp) throw "EmpGrp not found";
    return empgrp;
}
