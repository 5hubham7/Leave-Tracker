require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("_middleware/error-handler");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use("/managers", require("./manager/manager.controller"));
app.use("/employees", require("./employee/employee.controller"));
app.use("/countries", require("./country/country.controller"));
app.use("/groups", require("./group/group.controller"));
app.use("/leaves", require("./leave/leave.controller"));
app.use("/risks", require("./risk/risk.controller"));
app.use("/empgrps", require("./empgrp/empgrp.controller"));
app.use("/holidays", require("./holiday/holiday.controller"));

// global error handler
app.use(errorHandler);

// start server
const port =
    process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 5000;
app.listen(port, () => console.log("Server listening on port " + port));
