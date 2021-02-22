function errorHandler(err, req, res, next) {
    if (typeof err === "string") {
        return res.json({ status: 400, error: err, response: null });
    }

    if (err.name === "ValidationError") {
        return res.json({ status: 400, error: err.message, response: null });
    }

    if (err.name === "UnauthorizedError") {
        return res.json({ status: 401, error: err.message, response: null });
    }

    return res.json({ status: 500, error: err.message, response: null });
}

module.exports = errorHandler;
