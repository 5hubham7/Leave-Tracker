const express = require("express");
const app = express();
const groupService = require("./group.service");

app.get("/", getAllGroups);
app.get("/:group_id", getGroupById);
app.put("/:group_id", updateGroup);
app.delete("/:group_id", deleteGroup);
app.delete("/remove/:group_id/:employee_id", remove);

module.exports = app;

function getAllGroups(req, res) {
    groupService
        .getAll()
        .then((groups) =>
            res.json({ status: 200, error: null, response: groups })
        )
        .catch((err) => res.json({ status: 405, error: err, response: null }));
}

function getGroupById(req, res) {
    groupService
        .getById(req.params.id)
        .then((group) =>
            group
                ? res.json({ status: 405, error: null, response: group })
                : res.sendStatus(404)
        )
        .catch((err) => res.json({ status: 405, error: err, response: null }));
}

function updateGroup(req, res) {
    groupService
        .update(req.params.group_id, req.body)
        .then(() => res.json({ status: 200, error: null, response: "updated" }))
        .catch((err) => res.json({ status: 405, error: err, response: null }));
}

function deleteGroup(req, res) {
    groupService
        .delete(req.params.group_id)
        .then(() => res.json({ status: 200, error: null, response: "deleted" }))
        .catch((err) => res.json({ status: 405, error: err, response: null }));
}

function remove(req, res) {
    groupService
        .remove(req.params.group_id, req.params.employee_id)
        .then(() => res.json({ status: 200, error: null, response: "removed" }))
        .catch((err) => res.json({ status: 405, error: err, response: null }));
}
