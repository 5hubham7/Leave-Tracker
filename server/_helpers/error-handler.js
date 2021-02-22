function errorHandler(err, req, res, next) {
    if (typeof err === "string") {
        return res.json({ status: 400, error: err });
    }

    if (err.name === "ValidationError") {
        return res.json({ status: 400, error: err.message });
    }

    if (err.name === "UnauthorizedError") {
        return res.json({ status: 401, error: err.message });
    }

    return res.json({ status: 500, error: err.message });
}

module.exports = errorHandler;
