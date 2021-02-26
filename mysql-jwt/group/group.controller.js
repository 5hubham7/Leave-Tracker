const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const authorize = require("../_middleware/authorize");
const groupService = require("./group.service");

// routes

router.post("/", createSchema, create);
router.get("/", authorize(), getAll);
router.get("/groupEmployees/:group_name", authorize(), getEmployee);
router.get("/groupEmployeesCount/:group_name", authorize(), getEmployeeCount);
router.get(
    "/notGroupEmployees/:manager_id/:group_name",
    authorize(),
    getNotGroupEmployee
);
router.get("/:group_id", authorize(), getById);
router.put("/:group_id", authorize(), updateSchema, update);
router.delete("/:group_id", authorize(), _delete);

module.exports = router;

function createSchema(req, res, next) {
    const schema = Joi.object({
        group_name: Joi.string().required(),
        threshold: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    groupService
        .create(req.body)
        .then(() =>
            res.json({
                status: 200,
                error: null,
                response: "Added successfully!",
            })
        )
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}

function getAll(req, res, next) {
    groupService
        .getAll()
        .then((groups) =>
            res.json({ status: 200, error: null, response: groups })
        )
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}

function getEmployee(req, res, next) {
    groupService
        .getEmployee(req.params.group_name)
        .then((groups) =>
            res.json({ status: 200, error: null, response: groups })
        )
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}

function getEmployeeCount(req, res, next) {
    groupService
        .getEmployee(req.params.group_name)
        .then((groups) =>
            res.json({ status: 200, error: null, response: groups })
        )
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}

function getNotGroupEmployee(req, res, next) {
    console.log(req.params.manager_id, req.params.group_name);
    groupService
        .getNotGroupEmployee(req.params.manager_id, req.params.group_name)
        .then((groups) =>
            res.json({ status: 200, error: null, response: groups })
        )
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}

function getById(req, res, next) {
    groupService
        .getById(req.params.group_id)
        .then((group) =>
            res.json({ status: 200, error: null, response: group })
        )
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        group_name: Joi.string().empty(""),
        threshold: Joi.number().empty(),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    groupService
        .update(req.params.group_id, req.body)
        .then((group) =>
            res.json({ status: 200, error: null, response: group })
        )
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}

function _delete(req, res, next) {
    groupService
        .delete(req.params.group_id)
        .then(() =>
            res.json({
                status: 200,
                error: null,
                response: "Deleted successfully",
            })
        )
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}
