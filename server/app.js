const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const mongoService = require("./mongo_service");
const app = express();

const jwt = require("./_helpers/jwt");
const errorHandler = require("./_helpers/error-handler");

app.use(jwt());

app.use(errorHandler);

app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log("Server started!");
});

app.use(cors({ credentials: true, origin: "*" }));

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(bodyParser.json());
app.set("trust proxy", 1);

// MANAGER AUTHENTICATION API

app.use("/managers", require("./manager/manager.controller"));
app.use("/employees", require("./employee/employee.controller"));

// OTHER APIS

app.post("/addEmployee", addEmployee);
app.post("/addGroup", addGroup);
app.post("/addCountry", addCountry);
app.post("/addLeave", addLeave);
app.post("/addRisk", addRisk);

app.get("/getAllEmployees", getAllEmployees);
app.get("/getAllGroups", getAllGroups);
app.get("/getAllCountries", getAllCountries);
app.get("/getAllLeaves", getAllLeaves);

app.get("/getEmployeeById/:employee_id", getEmployeeById);
app.get("/getGroupById/:group_id", getGroupById);
app.get("/getCountryById/:country_id", getCountryById);
app.get("/getLeaveById/:leave_id", getLeaveById);
app.get("/getLeaveByDate/:start_date/:end_date", getLeaveByDate);

app.delete("/deleteEmployeeById/:employee_id", deleteEmployeeById);
app.delete("/deleteGroupById/:group_id", deleteGroupById);
app.delete("/deleteCountryById/:country_id", deleteCountryById);
app.delete("/deleteLeaveById/:leave_id", deleteLeaveById);
app.delete("/deleteLeaveByDate/:date", deleteLeaveByDate);

async function addEmployee(req, res) {
    let data = {
        employee_name: req.body.employee_name,
        employee_email: req.body.employee_email,
        employee_phone: req.body.employee_phone,
        employee_joining_date: req.body.employee_joining_date,
        leaves_available: req.body.leaves_available,
        group_id: req.body.group_id,
        manager_id: req.body.manager_id,
        country_id: req.body.country_id,
    };
    let result = await mongoService.insertOne("employees", data, "employee_id");
    res.send(result);
    console.log(result);
}

async function addGroup(req, res) {
    let data = {
        group_name: req.body.group_name,
        threshold: req.body.threshold,
        employees: req.body.employees,
    };
    let result = await mongoService.insertOne("groups", data, "group_id");
    res.send(result);
    console.log(result);
}

async function addCountry(req, res) {
    let data = {
        country_name: req.body.country_name,
        public_holidays: req.body.public_holidays,
    };
    let result = await mongoService.insertOne("countries", data, "country_id");
    res.send(result);
    console.log(result);
}

async function addLeave(req, res) {
    let data = {
        employee_id: req.body.employee_id,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
    };
    let result = await mongoService.insertOne("leaves", data, "leave_id");
    res.send(result);
    console.log(result);
}

async function addRisk(req, res) {
    let data = {
        employee_id: req.body.employee_id,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
    };
    let result = await mongoService.insertOne("risks", data, "risk_id");
    res.send(result);
    console.log(result);
}

async function getAllEmployees(req, res) {
    let result = await mongoService.find("employees");
    res.send(result);
    console.log(result);
}

async function getAllGroups(req, res) {
    let result = await mongoService.find("groups");
    res.send(result);
    console.log(result);
}

async function getAllCountries(req, res) {
    let result = await mongoService.find("countries");
    res.send(result);
    console.log(result);
}

async function getAllLeaves(req, res) {
    let result = await mongoService.find("leaves");
    res.send(result);
    console.log(result);
}

async function getEmployeeById(req, res) {
    let employee_id = parseInt(req.params.employee_id);
    let where = {
        employee_id: employee_id,
    };
    let result = await mongoService.findOne("employees", where);
    res.send(result);
    console.log(result);
}

async function getGroupById(req, res) {
    let group_id = req.params.group_id;
    let result = await mongoService.findOne("group", group_id);
    res.send(result);
    console.log(result);
}

async function getCountryById(req, res) {
    let group_id = req.params.country_id;
    let result = await mongoService.findOne("countries", country_id);
    res.send(result);
    console.log(result);
}

async function getLeaveById(req, res) {
    let group_id = req.params.country_id;
    let result = await mongoService.findOne("leaves", leave_id);
    res.send(result);
    console.log(result);
}

async function getLeaveByDate(req, res) {
    let start_date = req.params.start_date;
    let end_date = req.params.end_date;
    let where = {
        start_date: start_date,
        end_date: end_date,
    };
    let result = await mongoService.findOne(where);
    res.send(result);
    console.log(result);
}

async function deleteEmployeeById(req, res) {
    let employee_id = req.params.employee_id;
    let result = await mongoService.deleteOne("employees", {
        employee_id: employee_id,
    });
    res.send(result);
    console.log(result);
}

async function deleteGroupById(req, res) {
    let group_id = req.params.group_id;
    let result = await mongoService.deleteOne("groups", { group_id: group_id });
    res.send(result);
    console.log(result);
}

async function deleteCountryById(req, res) {
    let country_id = req.params.country_id;
    let result = await mongoService.deleteOne("countries", {
        country_id: country_id,
    });
    res.send(result);
    console.log(result);
}

async function deleteLeaveById(req, res) {
    let leave_id = req.params.leave_id;
    let result = await mongoService.deleteOne("leaves", { leave_id: leave_id });
    res.send(result);
    console.log(result);
}

async function deleteLeaveByDate(req, res) {
    let date = req.params.date;
    let result = await mongoService.deleteOne("leaves", { date: date });
    res.send(result);
    console.log(result);
}

// OTHER PENDING APIS:

// Set a risk in risk collection

// Get all risks from risk collection

// Get all risks of specific date from risk collection

// Add employee to a specific group

// Remove employee from a specific group

// Set threshold of a specific group

// Get public holidays of a specific country

// Get all leaves of a specific employee
