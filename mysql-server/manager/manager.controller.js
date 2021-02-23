const express = require("express");
const app = express();
const managerService = require("./manager.service");

app.post("/authenticate", authenticate);
app.post("/register", register);
app.get("/", getAllManagers);
app.put("/:manager_id", updateManager);
app.delete("/:manager_id", deleteManager);

module.exports = app;

function authenticate(req, res, next) {}

function register(req, res) {
    managerService.create(req.body).then((err, results) => {
        if (err) throw err;
        return res.send({ status: 200, error: null, response: results });
    });
}

function getAllManagers(req, res) {
    console.log(managerService.getAll());
}

function updateManager(req, res) {}

function deleteManager(req, res) {}
