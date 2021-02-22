const express = require("express");
const app = express();
const employeeService = require("./employee.service");

app.get("/", getAllEmployees);
app.get("/:id", getEmployeeById);
app.put("/:id", updateEmployee);
app.delete("/:id", deleteEmployee);

module.exports = app;

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
        .getById(req.params.id)
        .then((employee) =>
            employee ? res.json(employee) : res.sendStatus(404)
        )
        .catch((err) => res.json({ status: 405, error: err }));
}

function updateEmployee(req, res) {
    employeeService
        .update(req.params.id, req.body)
        .then(() => res.json({ status: 200, error: null, response: "updated" }))
        .catch((err) => res.json({ status: 405, error: err }));
}

function deleteEmployee(req, res) {
    employeeService
        .delete(req.params.id)
        .then(() => res.json({ status: 200, error: null, response: "deleted" }))
        .catch((err) => res.json({ status: 405, error: err }));
}
