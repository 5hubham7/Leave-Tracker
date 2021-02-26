const db = require("../_helpers/db");
const { QueryTypes } = require("sequelize");

module.exports = {
    getAll,
    getById,
    create,
    update,
    getEmployee,
    getNotGroupEmployee,
    getEmployeeCount,
    delete: _delete,
};

async function getAll() {
    return await db.Group.findAll();
}

async function getEmployee(group_name) {
    let query = `
    SELECT e.employee_id, employee_name, country_name, threshold, g.group_id
    FROM employees e, groups g, empgrps eg, countries c
    WHERE e.employee_id = eg.employee_id and g.group_id = eg.group_id and c.country_id = e.country_id and g.group_name ='${group_name}'
    `;
    return db.sequelize.query(query, {
        type: QueryTypes.SELECT,
    });
}

async function getEmployeeCount(group_name) {
    let query = `
    SELECT count(e.employee_id)
    FROM employees e, groups g, empgrps eg, countries c
    WHERE e.employee_id = eg.employee_id AND g.group_id = eg.group_id AND c.country_id = e.country_id AND g.group_name ='${group_name}'
    `;
    return db.sequelize.query(query, {
        type: QueryTypes.SELECT,
    });
}

async function getNotGroupEmployee(manager_id, group_name) {
    let query = `
    SELECT e.employee_id, employee_name, country_name
    FROM employees e, countries c
    WHERE e.manager_id = ${manager_id} AND e.country_id = c.country_id AND e.employee_id
    not in(select e.employee_id
        FROM employees e,groups g, empgrps eg
        WHERE e.employee_id = eg.employee_id AND g.group_id = eg.group_id AND group_name = '${group_name}')
    `;
    return db.sequelize.query(query, {
        type: QueryTypes.SELECT,
    });
}

async function getById(group_id) {
    return await getGroup(group_id);
}

async function create(params) {
    await db.Group.create(params);
}

async function update(group_id, params) {
    const group = await getGroup(group_id);

    // validate
    const groupnameChanged =
        params.group_name && group.group_name !== params.group_name;
    if (
        groupnameChanged &&
        (await db.Group.findOne({
            where: { group_name: params.group_name },
        }))
    ) {
        throw 'Groupname "' + params.group_name + '" is already taken';
    }

    Object.assign(group, params);
    await group.save();
}

async function _delete(group_id) {
    const group = await getGroup(group_id);
    await group.destroy();
}

async function getGroup(group_id) {
    const group = await db.Group.findByPk(group_id);
    if (!group) throw "Group not found";
    return group;
}
