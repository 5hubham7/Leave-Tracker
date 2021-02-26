const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const attributes = {
        employee_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        employee_name: { type: DataTypes.STRING, allowNull: false },
        employee_phone: { type: DataTypes.STRING, allowNull: false },
        employee_email: { type: DataTypes.STRING, allowNull: false },
        employee_password: { type: DataTypes.STRING, allowNull: false },
        manager_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Managers",
                key: "manager_id",
            },
        },
        country_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "countries",
                key: "country_id",
            },
        },
    };

    var Employee = sequelize.define("Employee", attributes);

    Employee.associate = function (models) {
        Employee.hasMany(models.Leave);
        Employee.hasMany(models.Risk);
        Employee.belongsTo(models.Manager, { foreignKey: "manager_id" });
        Employee.belongsTo(models.Country, { foreignKey: "country_id" });
        Employee.belongsToMany(models.Group, {
            through: "empgrps",
            foreignKey: "employee_id",
        });
    };

    return Employee;
};
