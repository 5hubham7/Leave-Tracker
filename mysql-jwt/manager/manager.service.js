const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const { QueryTypes } = require("sequelize");

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

async function authenticate({ manager_email, manager_password }) {
    const manager = await db.Manager.scope("withHash").findOne({
        where: { manager_email },
    });

    if (
        !manager ||
        !(await bcrypt.compare(manager_password, manager.manager_password))
    )
        throw new Error("Email or password is incorrect");

    // authentication successful
    const token = jwt.sign({ sub: manager.id }, config.secret, {
        expiresIn: "7d",
    });
    return { ...omitHash(manager.get()), token };
}

async function getAll() {
    return await db.Manager.findAll();
    // return db.sequelize.query("SELECT * FROM `managers`", {
    //     type: QueryTypes.SELECT,
    // });
}

async function getById(id) {
    return await getManager(id);
}

async function create(params) {
    // validate
    if (
        await db.Manager.findOne({
            where: { manager_email: params.manager_email },
        })
    ) {
        throw new Error(
            'Email "' + params.manager_email + '" is already taken'
        );
    }

    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.manager_password, 10);
    }

    // save manager
    await db.Manager.create(params);
}

async function update(id, params) {
    const manager = await getManager(id);

    // validate
    const managernameChanged =
        params.manager_email && manager.manager_email !== params.manager_email;
    if (
        managernameChanged &&
        (await db.Manager.findOne({
            where: { manager_email: params.manager_email },
        }))
    ) {
        throw new Error(
            'Managername "' + params.manager_email + '" is already taken'
        );
    }

    // hash password if it was entered
    if (params.password) {
        params.manager_password = await bcrypt.hash(params.password, 10);
    }

    // copy params to manager and save
    Object.assign(manager, params);
    await manager.save();

    return omitHash(manager.get());
}

async function _delete(id) {
    const manager = await getManager(id);
    await manager.destroy();
}

// helper functions

async function getManager(id) {
    const manager = await db.Manager.findByPk(id);
    if (!manager) throw new Error("Manager not found");
    return manager;
}

function omitHash(manager) {
    const { hash, ...managerWithoutHash } = manager;
    return managerWithoutHash;
}
