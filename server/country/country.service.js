const db = require("../_helpers/db");
const Country = db.Country;

module.exports = {
    getAll,
    getById,
    create,
    update,
    add: add,
    remove: remove,
    delete: _delete,
};

async function getAll() {
    return await Country.find();
}

async function getById(country_id) {
    return await Country.findOne({ country_id: country_id });
}

async function create(countryParam) {
    if (await Country.findOne({ country_name: countryParam.country_name })) {
        throw new Error(
            "Name '" + countryParam.country_name + "' is already taken"
        );
    }
    const country = new Country(countryParam);

    await country.save();
}

async function update(country_id, countryParam) {
    const country = await Country.findOne({ country_id: parseInt(country_id) });

    if (!country) throw new Error("Country not found");
    if (
        country.country_name !== countryParam.country_name &&
        (await Country.findOne({ country_name: countryParam.country_name }))
    ) {
        throw new Error(
            'Country name "' + countryParam.country_name + '" is already taken'
        );
    }

    Object.assign(country, countryParam);
    console.log(country);
    await country.save();
}

async function add(country_id, public_holiday) {
    await Country.findOneAndUpdate(
        { country_id: parseInt(country_id) },
        {
            $push: {
                public_holidays: { public_holiday: parseInt(public_holiday) },
            },
        },
        { safe: true },
        (err) => {
            if (err) throw err;
        }
    );
}

async function remove(country_id, public_holiday) {
    await Country.findOneAndUpdate(
        { country_id: parseInt(country_id) },
        {
            $pull: {
                public_holidays: { public_holiday: parseInt(public_holiday) },
            },
        },
        { safe: true },
        (err) => {
            if (err) throw err;
        }
    );
}

async function _delete(id) {
    await Country.findByIdAndRemove(id);
}
