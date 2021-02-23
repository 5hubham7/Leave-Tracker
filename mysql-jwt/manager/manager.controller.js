const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const managerService = require("./manager.service");

// routes
router.post("/authenticate", authenticateSchema, authenticate);
router.post("/register", registerSchema, register);
router.get("/", authorize(), getAll);
router.get("/current", authorize(), getCurrent);
router.get("/:id", authorize(), getById);
router.put("/:id", authorize(), updateSchema, update);
router.delete("/:id", authorize(), _delete);

module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        manager_email: Joi.string().required(),
        manager_password: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    managerService
        .authenticate(req.body)
        .then((manager) => res.json(manager))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        manager_name: Joi.string().required(),
        manager_phone: Joi.string().required(),
        manager_email: Joi.string().required(),
        manager_password: Joi.string().min(6).required(),
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    managerService
        .create(req.body)
        .then(() => res.json({ message: "Registration successful" }))
        .catch(next);
}

function getAll(req, res, next) {
    managerService
        .getAll()
        .then((managers) => res.json(managers))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.manager);
}

function getById(req, res, next) {
    managerService
        .getById(req.params.id)
        .then((manager) => res.json(manager))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        manager_name: Joi.string().empty(""),
        manager_phone: Joi.string().empty(""),
        manager_email: Joi.string().empty(""),
        manager_password: Joi.string().min(6).empty(""),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    managerService
        .update(req.params.id, req.body)
        .then((manager) => res.json(manager))
        .catch(next);
}

function _delete(req, res, next) {
    managerService
        .delete(req.params.id)
        .then(() => res.json({ message: "User deleted successfully" }))
        .catch(next);
}
