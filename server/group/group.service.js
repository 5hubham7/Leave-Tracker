const db = require("../_helpers/db");
const Group = db.Group;

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove: remove,
    delete: _delete,
};

async function getAll() {
    return await Group.find();
}

async function getById(group_id) {
    return await Group.findOne({ group_id: group_id });
}

async function create(groupParam) {
    if (await Group.findOne({ group_name: groupParam.group_name })) {
        throw new Error(
            "Name '" + groupParam.group_name + "' is already taken"
        );
    }
    const group = new Group(groupParam);

    await group.save();
}

async function update(group_id, groupParam) {
    const group = await Group.findOne({ group_id: parseInt(group_id) });

    if (!group) throw new Error("Group not found");
    if (
        group.group_name !== groupParam.group_name &&
        (await Group.findOne({ group_name: groupParam.group_name }))
    ) {
        throw new Error(
            'Group name "' + groupParam.group_name + '" is already taken'
        );
    }

    Object.assign(group, groupParam);
    console.log(group);
    await group.save();
}

async function remove(group_id, employee_id) {
    await Group.findOneAndUpdate(
        { group_id: parseInt(group_id) },
        { $pull: { employees: { employee_id: parseInt(employee_id) } } },
        { safe: true },
        (err) => {
            if (err) throw err;
        }
    );
}

async function _delete(id) {
    await Group.findByIdAndRemove(id);
}
