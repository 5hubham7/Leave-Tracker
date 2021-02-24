const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const attributes = {
        risk_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        start_date: { type: DataTypes.DATE, allowNull: false },
        end_date: { type: DataTypes.DATE, allowNull: false },
        leave_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Leaves",
                key: "leave_id",
            },
        },
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Employees",
                key: "employee_id",
            },
        },
    };

    var Risk = sequelize.define("Risk", attributes);

    Risk.associate = function (models) {
        Risk.belongsTo(models.Leave, { foreignKey: "leave_id" });
        Risk.belongsTo(models.Employee, { foreignKey: "employee_id" });
    };

    return Risk;
};
