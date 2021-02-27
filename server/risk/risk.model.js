const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const attributes = {
        risk_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        start_date: { type: DataTypes.DATEONLY, allowNull: false },
        end_date: { type: DataTypes.DATEONLY, allowNull: false },
        risk_type: {
            type: DataTypes.STRING,
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
    };

    var Risk = sequelize.define("Risk", attributes);

    Risk.associate = function (models) {
        Risk.belongsTo(models.Group, { foreignKey: "group_id" });
    };

    return Risk;
};
