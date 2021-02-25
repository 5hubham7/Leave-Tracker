const express = require("express");
const app = express();
const countryService = require("./country.service");

app.post("/", createCountry);
app.get("/", getAllCountries);
app.get("/:country_id", getCountryById);
app.put("/:country_id", updateCountry);
app.delete("/:country_id", deleteCountry);
app.post("/remove/:country_id/:public_holiday", add);
app.delete("/remove/:country_id/:public_holiday", remove);

module.exports = app;

function createCountry(req, res) {
    countryService
        .create(req.body)
        .then(() => res.json({ status: 200, error: null, response: "created" }))
        .catch((err) => res.json({ status: 405, error: err, responce: null }));
}

function getAllCountries(req, res) {
    countryService
        .getAll()
        .then((countries) =>
            res.json({ status: 200, error: null, response: countries })
        )
        .catch((err) => res.json({ status: 405, error: err, response: null }));
}

function getCountryById(req, res) {
    countryService
        .getById(req.params.id)
        .then((country) =>
            country
                ? res.json({ status: 405, error: null, response: country })
                : res.sendStatus(404)
        )
        .catch((err) => res.json({ status: 405, error: err, response: null }));
}

function updateCountry(req, res) {
    countryService
        .update(req.params.country_id, req.body)
        .then(() => res.json({ status: 200, error: null, response: "updated" }))
        .catch((err) => res.json({ status: 405, error: err, response: null }));
}

function deleteCountry(req, res) {
    countryService
        .delete(req.params.country_id)
        .then(() => res.json({ status: 200, error: null, response: "deleted" }))
        .catch((err) => res.json({ status: 405, error: err, response: null }));
}

function add(req, res) {
    countryService
        .add(req.params.country_id, req.params.public_holiday)
        .then(() => res.json({ status: 200, error: null, response: "added" }))
        .catch((err) => res.json({ status: 405, error: err, response: null }));
}

function remove(req, res) {
    countryService
        .remove(req.params.country_id, req.params.public_holiday)
        .then(() => res.json({ status: 200, error: null, response: "removed" }))
        .catch((err) => res.json({ status: 405, error: err, response: null }));
}
