const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const authorize = require("../_middleware/authorize");
const holidayService = require("./holiday.service");

// routes

router.post("/", createSchema, create);
router.get("/", authorize(), getAll);
router.get("/:id", authorize(), getById);
router.put("/:id", authorize(), updateSchema, update);
router.delete("/:id", authorize(), _delete);

module.exports = router;

function createSchema(req, res, next) {
    const schema = Joi.object({
        holiday_name: Joi.string().required(),
        holiday_date: Joi.date().required(),
        country_id: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    holidayService
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
    holidayService
        .getAll()
        .then((holidays) =>
            res.json({ status: 200, error: null, response: holidays })
        )
        .catch(next);
}

function getById(req, res, next) {
    holidayService
        .getById(req.params.id)
        .then((holiday) =>
            res.json({ status: 200, error: null, response: holiday })
        )
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        holiday_name: Joi.string().empty(""),
        holiday_date: Joi.date().empty(""),
        country_id: Joi.string().empty(""),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    holidayService
        .update(req.params.id, req.body)
        .then((holiday) =>
            res.json({
                status: 200,
                error: null,
                response: holiday,
            })
        )
        .catch(next);
}

function _delete(req, res, next) {
    holidayService
        .delete(req.params.id)
        .then(() =>
            res.json({
                status: 200,
                error: null,
                response: "Deleted successfully!",
            })
        )
        .catch(next);
}
