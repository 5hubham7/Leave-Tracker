const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const authorize = require("../_middleware/authorize");
const employeeService = require("./employee.service");

// routes

router.post("/register", registerSchema, register);
router.get("/", authorize(), getAll);
router.get("/:id", authorize(), getById);
router.put("/:id", authorize(), updateSchema, update);
router.delete("/:id", authorize(), _delete);

module.exports = router;

function registerSchema(req, res, next) {
    const schema = Joi.object({
        employee_name: Joi.string().required(),
        employee_phone: Joi.string().required(),
        employee_email: Joi.string().required(),
        employee_password: Joi.string().min(6).required(),
        manager_id: Joi.number().required(),
        country_id: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    employeeService
        .create(req.body)
        .then(() => res.json({ message: "Registration successful" }))
        .catch(next);
}

function getAll(req, res, next) {
    employeeService
        .getAll()
        .then((employees) => res.json(employees))
        .catch(next);
}

function getById(req, res, next) {
    employeeService
        .getById(req.params.id)
        .then((employee) => res.json(employee))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        employee_name: Joi.string().empty(""),
        employee_phone: Joi.string().empty(""),
        employee_email: Joi.string().empty(""),
        employee_password: Joi.string().min(6).empty(""),
        manager_id: Joi.number().empty(""),
        country_id: Joi.number().empty(""),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    employeeService
        .update(req.params.id, req.body)
        .then((employee) => res.json(employee))
        .catch(next);
}

function _delete(req, res, next) {
    employeeService
        .delete(req.params.id)
        .then(() => res.json({ message: "Employee deleted successfully" }))
        .catch(next);
}
