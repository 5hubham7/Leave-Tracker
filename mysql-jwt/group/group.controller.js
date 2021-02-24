const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const authorize = require("../_middleware/authorize");
const groupService = require("./group.service");

// routes

router.post("/", createSchema, create);
router.get("/", authorize(), getAll);
router.get("/:id", authorize(), getById);
router.put("/:id", authorize(), updateSchema, update);
router.delete("/:id", authorize(), _delete);

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
        .then(() => res.json({ message: "Registration successful" }))
        .catch(next);
}

function getAll(req, res, next) {
    groupService
        .getAll()
        .then((groups) => res.json(groups))
        .catch(next);
}

function getById(req, res, next) {
    groupService
        .getById(req.params.id)
        .then((group) => res.json(group))
        .catch(next);
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
        .update(req.params.id, req.body)
        .then((group) => res.json(group))
        .catch(next);
}

function _delete(req, res, next) {
    groupService
        .delete(req.params.id)
        .then(() => res.json({ message: "Group deleted successfully" }))
        .catch(next);
}
