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
    return await db.Country.findAll();
    // return db.sequelize.query("SELECT * FROM `countrys`", {
    //     type: QueryTypes.SELECT,
    // });
}

async function getById(country_id) {
    return await getCountry(country_id);
}

async function create(params) {
    await db.Country.create(params);
}

async function update(country_id, params) {
    const country = await getCountry(country_id);

    // validate
    const countrynameChanged =
        params.country_name && country.country_name !== params.country_name;
    if (
        countrynameChanged &&
        (await db.Country.findOne({
            where: { country_name: params.country_name },
        }))
    ) {
        throw 'Countryname "' + params.country_name + '" is already taken';
    }

    Object.assign(country, params);
    await country.save();
}

async function _delete(country_id) {
    const country = await getCountry(country_id);
    await country.destroy();
}

async function getCountry(country_id) {
    const country = await db.Country.findByPk(country_id);
    if (!country) throw "Country not found";
    return country;
}
