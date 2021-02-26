const config = require("../config.json");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({
        host,
        port,
        user,
        password,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, {
        dialect: "mysql",
    });

    // init models and add them to the exported db object
    db.Manager = require("../manager/manager.model")(sequelize);
    db.Country = require("../country/country.model")(sequelize);
    db.Group = require("../group/group.model")(sequelize);
    db.Employee = require("../employee/employee.model")(sequelize);
    db.EmpGrp = require("../empgrp/empgrp.model")(sequelize);
    db.PublicHolidays = require("../holiday/holiday.model")(sequelize);
    db.Leave = require("../leave/leave.model")(sequelize);
    db.Risk = require("../risk/risk.model")(sequelize);

    db.sequelize = sequelize;

    // sync all models with database
    await sequelize.sync();
}
