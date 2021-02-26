const db = require("../_helpers/db");
const { QueryTypes } = require("sequelize");
const { param } = require("./risk.controller");

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

async function getAll() {
    let query = `
    SELECT r.risk_id, r.start_date, r.end_date, r.risk_type, g.group_name, g.threshold 
    FROM risks r, ltdb.groups g 
    WHERE r.group_id = g.group_id;
    `;
    return db.sequelize.query(query, {
        type: QueryTypes.SELECT,
    });
}

async function getById(leave_id) {
    return await getLeave(leave_id);
}

function getDateInFormat(d) {
    var dt = new Date(d);
    var dd = dt.getDate();
    var mm = dt.getMonth() + 1;
    var yyyy = dt.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    return yyyy + "-" + mm + "-" + dd;
}

async function create(params) {
    params.start_date = getDateInFormat(params.start_date);
    params.end_date = getDateInFormat(params.end_date);

    let query = `
    SELECT * FROM risks
    WHERE start_date = '${params.start_date}' AND end_date = '${params.end_date}' AND group_id= ${params.group_id}
    `;
    let result = await db.sequelize.query(query, {
        type: QueryTypes.SELECT,
    });

    if (Object.keys(result).length === 0) {
        await db.Risk.create(params);
    } else throw "Risk already exists!";
}

async function update(leave_id, params) {
    const risk = await getLeave(leave_id);

    Object.assign(risk, params);
    await risk.save();
}

async function _delete(leave_id) {
    const risk = await getLeave(leave_id);
    await risk.destroy();
}

async function getLeave(leave_id) {
    const risk = await db.Risk.findByPk(leave_id);
    if (!risk) throw "Risk not found";
    return risk;
}
