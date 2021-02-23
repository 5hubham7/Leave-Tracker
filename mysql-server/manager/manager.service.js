const db = require("../_helpers/mysql_helper");

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

async function authenticate({ manager_email, password }) {}

async function getAll() {}

async function getById(manager_id) {}

async function create(managerParam) {
    let data = {
        manager_email: managerParam.manager_email,
        manager_password: managerParam.manager_password,
        manager_name: managerParam.manager_name,
        manager_phone: managerParam.manager_phone,
    };
    let sql = "INSERT INTO managers SET ?;";
    db.query(sql, data, (err, results) => {
        if (err) throw err;
        return results;
    });
}

async function update(manager_id, managerParam) {}

async function _delete(manager_id) {}
