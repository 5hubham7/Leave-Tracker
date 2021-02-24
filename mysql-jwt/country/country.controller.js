const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const authorize = require("../_middleware/authorize");
const countryService = require("./country.service");

// routes

router.post("/", createSchema, create);
router.get("/", authorize(), getAll);
router.get("/:id", authorize(), getById);
router.put("/:id", authorize(), updateSchema, update);
router.delete("/:id", authorize(), _delete);

module.exports = router;

function createSchema(req, res, next) {
    const schema = Joi.object({
        country_name: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    countryService
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
    countryService
        .getAll()
        .then((countries) =>
            res.json({ status: 200, error: null, response: countries })
        )
        .catch(next);
}

function getById(req, res, next) {
    countryService
        .getById(req.params.id)
        .then((country) =>
            res.json({ status: 200, error: null, response: country })
        )
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        country_name: Joi.string().empty(""),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    countryService
        .update(req.params.id, req.body)
        .then((country) =>
            res.json({ status: 200, error: null, response: country })
        )
        .catch(next);
}

function _delete(req, res, next) {
    countryService
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
