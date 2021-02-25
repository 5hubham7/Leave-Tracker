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

function getById(req, res, next) {
    groupService
        .getById(req.params.id)
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
        .update(req.params.id, req.body)
        .then((group) =>
            res.json({ status: 200, error: null, response: group })
        )
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}

function _delete(req, res, next) {
    groupService
        .delete(req.params.id)
        .then(() =>
            res.json({
                status: 200,
                error: null,
                response: "Deleted successfully",
            })
        )
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}
