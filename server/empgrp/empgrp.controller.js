const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const authorize = require("../_middleware/authorize");
const empgrpService = require("./empgrp.service");

// routes

router.post("/", createSchema, create);
router.get("/", authorize(), getAll);
router.get("/:empgrp_id", authorize(), getById);
router.put("/:empgrp_id", authorize(), updateSchema, update);
router.delete("/:employee_id/:group_id", authorize(), _delete);

module.exports = router;

function createSchema(req, res, next) {
    const schema = Joi.object({
        group_id: Joi.number().required(),
        employee_id: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    empgrpService
        .create(req.body)
        .then(() =>
            res.json({
                status: 200,
                error: null,
                response: "Addedd successfully!",
            })
        )
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}

function getAll(req, res, next) {
    empgrpService
        .getAll()
        .then((empgrps) =>
            res.json({ status: 200, error: null, response: empgrps })
        )
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}

function getById(req, res, next) {
    empgrpService
        .getById(req.params.empgrp_id)
        .then((empgrp) =>
            res.json({ status: 200, error: null, response: empgrp })
        )
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        group_id: Joi.number().empty(),
        employee_id: Joi.number().empty(),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    empgrpService
        .update(req.params.empgrp_id, req.body)
        .then((empgrp) =>
            res.json({ status: 200, error: null, response: empgrp })
        )
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}

function _delete(req, res, next) {
    empgrpService
        .delete(req.params.employee_id, req.params.group_id)
        .then(() =>
            res.json({
                status: 200,
                error: null,
                response: "Deleted successfully!",
            })
        )
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}
