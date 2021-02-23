const express = require("express");
const app = express();
const employeeService = require("./employee.service");

app.post("/", createEmployee);
app.get("/", getAllEmployees);
app.get("/:employee_id", getEmployeeById);
app.put("/:employee_id", updateEmployee);
app.delete("/:employee_id", deleteEmployee);

module.exports = app;

function createEmployee(req, res) {
    employeeService
        .create(req.body)
        .then(() => res.json({ status: 200, error: null, response: "created" }))
        .catch((err) => res.json({ status: 405, error: err }));
}

function getAllEmployees(req, res) {
    employeeService
        .getAll()
        .then((employees) =>
            res.json({ status: 200, error: null, response: employees })
        )
        .catch((err) => res.json({ status: 405, error: err }));
}

function getEmployeeById(req, res) {
    employeeService
        .getById(req.params.employee_id)
        .then((employee) =>
            employee ? res.json(employee) : res.sendStatus(404)
        )
        .catch((err) => res.json({ status: 405, error: err }));
}

function updateEmployee(req, res) {
    employeeService
        .update(req.params.employee_id, req.body)
        .then(() => res.json({ status: 200, error: null, response: "updated" }))
        .catch((err) => res.json({ status: 405, error: err }));
}

function deleteEmployee(req, res) {
    employeeService
        .delete(req.params.employee_id)
        .then(() => res.json({ status: 200, error: null, response: "deleted" }))
        .catch((err) => res.json({ status: 405, error: err }));
}
