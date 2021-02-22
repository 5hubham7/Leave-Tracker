const express = require("express");
const app = express();
const employeeService = require("./employee.service");

app.get("/getAllEmployees", getAllEmployees);
app.get("/getEmployeeById/:id", getEmployeeById);
app.put("/updateEmployee/:id", updateEmployee);
app.delete("/deleteEmployee/:id", deleteEmployee);

module.exports = app;

function getAllEmployees(req, res) {
    employeeService
        .getAll()
        .then((employees) => res.json(employees))
        .catch((err) => res.json({ error: err }));
}

function getEmployeeById(req, res) {
    employeeService
        .getById(req.params.id)
        .then((employee) =>
            employee ? res.json(employee) : res.sendStatus(404)
        )
        .catch((err) => res.json({ error: err }));
}

function updateEmployee(req, res) {
    employeeService
        .update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch((err) => res.json({ error: err }));
}

function deleteEmployee(req, res) {
    employeeService
        .delete(req.params.id)
        .then(() => res.json({}))
        .catch((err) => res.json({ error: err }));
}
