const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const attributes = {
        public_holiday_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        public_holiday_name: { type: DataTypes.STRING, allowNull: false },
        public_holiday_date: { type: DataTypes.DATEONLY, allowNull: false },
        country_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "countries",
                key: "country_id",
            },
        },
    };

    var Holiday = sequelize.define("Holiday", attributes);

    Holiday.associate = function (models) {
        Holiday.belongsTo(models.Country, { foreignKey: "country_id" });
    };

    return Holiday;
};
