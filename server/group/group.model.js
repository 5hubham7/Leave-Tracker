const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const attributes = {
        group_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        group_name: { type: DataTypes.STRING, allowNull: false },
        threshold: { type: DataTypes.INTEGER, allowNull: false },
    };

    var Group = sequelize.define("Group", attributes);

    Group.associate = function (models) {
        Group.belongsToMany(models.Employee, {
            through: "empgrps",
            foreignKey: "employee_id",
        });
    };

    return Group;
};
