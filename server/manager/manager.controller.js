const express = require("express");
const app = express();
const managerService = require("./manager.service");

app.post("/authenticate", authenticate);
app.post("/register", register);
app.get("/", getAllManagers);
app.put("/:manager_id", updateManager);
app.delete("/:manager_id", deleteManager);

module.exports = app;

function authenticate(req, res, next) {
    managerService
        .authenticate(req.body)
        .then((manager) =>
            manager
                ? res.json({ status: 200, error: null, response: manager })
                : res.json({
                      status: 405,
                      error: "Email or password is incorrect!",
                  })
        )
        .catch((err) => next(err));
}

function register(req, res) {
    managerService
        .create(req.body)
        .then(() =>
            res.json({ status: 200, error: null, response: "registered" })
        )
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}

function getAllManagers(req, res) {
    managerService
        .getAll()
        .then((managers) =>
            res.json({ status: 200, error: null, response: managers })
        )
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}

function updateManager(req, res) {
    managerService
        .update(req.params.manager_id, req.body)
        .then(() => res.json({ status: 200, error: null, response: "updated" }))
        .catch((err) => res.json({ statusL: 405, error: err }));
}

function deleteManager(req, res) {
    managerService
        .delete(req.params.manager_id)
        .then(() => res.json({ status: 200, error: null, response: "deleted" }))
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}
