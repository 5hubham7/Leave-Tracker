const { DataTypes, HasMany } = require("sequelize");

module.exports = (sequelize) => {
    const attributes = {
        manager_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        manager_name: { type: DataTypes.STRING, allowNull: false },
        manager_phone: { type: DataTypes.STRING, allowNull: false },
        manager_email: { type: DataTypes.STRING, allowNull: false },
        manager_password: { type: DataTypes.STRING, allowNull: false },
    };

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ["manager_password"] },
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {} },
        },
    };

    var Manager = sequelize.define("Manager", attributes, options);

    Manager.associate = function (models) {
        Manager.HasMany(models.Employee);
    };

    return Manager;
};
