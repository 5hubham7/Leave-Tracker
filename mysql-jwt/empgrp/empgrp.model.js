const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const attributes = {
        empgrp_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        group_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Groups",
                key: "group_id",
            },
        },
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Employees",
                key: "Employee_id",
            },
        },
    };

    var EmpGrp = sequelize.define("EmpGrp", attributes);

    EmpGrp.associate = function (models) {
        EmpGrp.belongsTo(models.Group, { foreignKey: "group_id" });
        EmpGrp.belongsTo(models.Employee, { foreignKey: "employee_id" });
    };

    return EmpGrp;
};
