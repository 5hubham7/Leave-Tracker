const config = require("../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../_helpers/db");
const Manager = db.Manager;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

async function authenticate({ manager_email, password }) {
    const manager = await Manager.findOne({ manager_email });
    if (manager && bcrypt.compareSync(password, manager.password)) {
        const token = jwt.sign({ sub: manager.id }, config.secret, {
            expiresIn: "7d",
        });
        return {
            ...manager.toJSON(),
            token,
        };
    }
}

async function getAll() {
    return await Manager.find();
}

async function getById(manager_id) {
    return await Manager.findById(manager_id);
}

async function create(managerParam) {
    if (await Manager.findOne({ manager_email: managerParam.manager_email })) {
        throw new Error(
            "Manager Email '" +
                managerParam.manager_email +
                "' is already taken"
        );
    }
    const manager = new Manager(managerParam);
    if (managerParam.password) {
        manager.password = bcrypt.hashSync(managerParam.password, 10);
    }

    await manager.save();
}

async function update(manager_id, managerParam) {
    const manager = await Manager.findOne({ manager_id: parseInt(manager_id) });

    if (!manager) throw new Error("Manager not found");
    if (
        manager.manager_email !== managerParam.manager_email &&
        (await Manager.findOne({ manager_email: managerParam.manager_email }))
    ) {
        throw new Error(
            'Manager Email "' +
                managerParam.manager_email +
                '" is already taken'
        );
    }

    if (managerParam.password) {
        managerParam.password = bcrypt.hashSync(managerParam.password, 10);
    }

    Object.assign(manager, managerParam);

    await manager.save();
}

async function _delete(manager_id) {
    await Manager.findByIdAndRemove(manager_id);
}
