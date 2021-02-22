const express = require("express");
const app = express();
const managerService = require("./manager.service");

app.post("/authenticate", authenticate);
app.post("/register", register);
app.get("/getAllManagers", getAllManagers);
app.get("/getCurrentManager", getCurrentManager);
app.get("/getManagerById/:id", getManagerById);
app.put("/updateManager/:id", updateManager);
app.delete("/deleteManager/:id", deleteManager);

module.exports = app;

function authenticate(req, res, next) {
    managerService
        .authenticate(req.body)
        .then((manager) =>
            manager
                ? res.json(manager)
                : res.json({ error: "Email or password is incorrect!" })
        )
        .catch((err) => next(err));
}

function register(req, res) {
    managerService
        .create(req.body)
        .then(() => res.json({ registered: true }))
        .catch((err) => res.json({ error: err }));
}

function getAllManagers(req, res) {
    managerService
        .getAll()
        .then((managers) => res.json(managers))
        .catch((err) => res.json({ error: err }));
}

function getCurrentManager(req, res) {
    managerService
        .getById(req.manager.sub)
        .then((manager) => (manager ? res.json(manager) : res.sendStatus(404)))
        .catch((err) => res.json({ error: err }));
}

function getManagerById(req, res) {
    managerService
        .getById(req.params.id)
        .then((manager) => (manager ? res.json(manager) : res.sendStatus(404)))
        .catch((err) => res.json({ error: err }));
}

function updateManager(req, res) {
    managerService
        .update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch((err) => res.json({ error: err }));
}

function deleteManager(req, res) {
    managerService
        .delete(req.params.id)
        .then(() => res.json({}))
        .catch((err) => res.json({ error: err }));
}
