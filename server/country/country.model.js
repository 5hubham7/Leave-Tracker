const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const attributes = {
        country_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        country_name: { type: DataTypes.STRING, allowNull: false },
    };

    var Country = sequelize.define("Country", attributes);

    Country.associate = function (models) {
        Country.hasMany(models.PublicHoliday);
        Country.hasMany(models.Employee);
    };

    return Country;
};
