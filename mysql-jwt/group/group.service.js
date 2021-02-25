const db = require("../_helpers/db");
const { QueryTypes } = require("sequelize");

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

async function getAll() {
    return await db.Group.findAll();
    // return db.sequelize.query("SELECT * FROM `groups`", {
    //     type: QueryTypes.SELECT,
    // });
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
