const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        manager_name: { type: DataTypes.STRING, allowNull: false },
        manager_phone: { type: DataTypes.STRING, allowNull: false },
        manager_email: { type: DataTypes.STRING, allowNull: false },
        manager_password: { type: DataTypes.STRING, allowNull: false },
    };

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ["hash"] },
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {} },
        },
    };

    return sequelize.define("Manager", attributes, options);
}
