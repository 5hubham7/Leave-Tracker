const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const authorize = require("../_middleware/authorize");
const riskService = require("./risk.service");

// routes

router.post("/", createSchema, create);
router.get("/", authorize(), getAll);
router.get("/:risk_id", authorize(), getById);
router.put("/:risk_id", authorize(), updateSchema, update);
router.delete("/:risk_id", authorize(), _delete);

module.exports = router;

function createSchema(req, res, next) {
    const schema = Joi.object({
        start_date: Joi.date().required(),
        end_date: Joi.date().required(),
        leave_id: Joi.number().required(),
        employee_id: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    riskService
        .create(req.body)
        .then(() =>
            res.json({
                status: 200,
                error: null,
                response: "Added successfully!",
            })
        )
        .catch(next);
}

function getAll(req, res, next) {
    riskService
        .getAll()
        .then((risks) =>
            res.json({
                status: 200,
                error: null,
                response: risks,
            })
        )
        .catch(next);
}

function getById(req, res, next) {
    riskService
        .getById(req.params.risk_id)
        .then((risk) =>
            res.json({
                status: 200,
                error: null,
                response: risk,
            })
        )
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        start_date: Joi.date().required().empty(""),
        end_date: Joi.date().required().empty(""),
        leave_id: Joi.number().empty(),
        employee_id: Joi.number().empty(),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    riskService
        .update(req.params.risk_id, req.body)
        .then((risk) =>
            res.json({
                status: 200,
                error: null,
                response: risk,
            })
        )
        .catch(next);
}

function _delete(req, res, next) {
    riskService
        .delete(req.params.risk_id)
        .then(() =>
            res.json({
                status: 200,
                error: null,
                response: "Deleted successfully!",
            })
        )
        .catch(next);
}
