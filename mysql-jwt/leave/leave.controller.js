const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const authorize = require("../_middleware/authorize");
const leaveService = require("./leave.service");

// routes

router.post("/", createSchema, create);
router.get("/", authorize(), getAll);
router.get("/:id", authorize(), getById);
router.put("/:id", authorize(), updateSchema, update);
router.delete("/:id", authorize(), _delete);

module.exports = router;

function createSchema(req, res, next) {
    const schema = Joi.object({
        start_date: Joi.date().required(),
        end_date: Joi.date().required(),
        employee_id: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    leaveService
        .create(req.body)
        .then(() => res.json({ message: "Registration successful" }))
        .catch(next);
}

function getAll(req, res, next) {
    leaveService
        .getAll()
        .then((leaves) =>
            res.json({
                status: 200,
                error: null,
                response: leaves,
            })
        )
        .catch(next);
}

function getById(req, res, next) {
    leaveService
        .getById(req.params.id)
        .then((leave) =>
            res.json({
                status: 200,
                error: null,
                response: leave,
            })
        )
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        start_date: Joi.date().required().empty(""),
        end_date: Joi.date().required().empty(""),
        employee_id: Joi.number().empty(),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    leaveService
        .update(req.params.id, req.body)
        .then((leave) =>
            res.json({
                status: 200,
                error: null,
                response: leave,
            })
        )
        .catch(next);
}

function _delete(req, res, next) {
    leaveService
        .delete(req.params.id)
        .then(() =>
            res.json({
                status: 200,
                error: null,
                response: "Deleted successfully",
            })
        )
        .catch(next);
}
