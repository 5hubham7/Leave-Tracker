const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const authorize = require("../_middleware/authorize");
const leaveService = require("./leave.service");

// routes

router.post("/", createSchema, create);
router.get("/", authorize(), getAll);
router.get("/getbyname", authorize(), getByName);
router.get(
    "/getEmployeeLeaves/:group_id/:start_date/:end_date",
    authorize(),
    getEmployeeLeaves
);
router.get("/:leave_id", authorize(), getById);
router.put("/:leave_id", authorize(), updateSchema, update);
router.delete("/:leave_id", authorize(), _delete);

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
        .then(() =>
            res.json({ status: 200, error: null, response: "Added successful" })
        )
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
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
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}

function getById(req, res, next) {
    leaveService
        .getById(req.params.leave_id)
        .then((leave) =>
            res.json({
                status: 200,
                error: null,
                response: leave,
            })
        )
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}

function getByName(req, res, next) {
    leaveService
        .getByName(req.body.employee_name)
        .then((leave) =>
            res.json({
                status: 200,
                error: null,
                response: leave,
            })
        )
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}

function getEmployeeLeaves(req, res, next) {
    leaveService
        .getEmployeeLeaves(
            req.params.group_id,
            req.params.start_date,
            req.params.end_date
        )
        .then((leaves) =>
            res.json({
                status: 200,
                error: null,
                response: leaves,
            })
        )
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
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
        .update(req.params.leave_id, req.body)
        .then((leave) =>
            res.json({
                status: 200,
                error: null,
                response: leave,
            })
        )
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}

function _delete(req, res, next) {
    leaveService
        .delete(req.params.leave_id)
        .then(() =>
            res.json({
                status: 200,
                error: null,
                response: "Deleted successfully",
            })
        )
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}
