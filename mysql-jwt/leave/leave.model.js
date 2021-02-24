const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const attributes = {
        leave_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        start_date: { type: DataTypes.DATE, allowNull: false },
        end_date: { type: DataTypes.DATE, allowNull: false },
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Employees",
                key: "employee_id",
            },
        },
    };

    var Leave = sequelize.define("Leave", attributes);

    Leave.associate = function (models) {
        Leave.belongsTo(models.Employee, { foreignKey: "employee_id" });
        Leave.hasMany(models.Risk);
    };

    return Leave;
};
