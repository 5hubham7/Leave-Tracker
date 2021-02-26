module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    switch (true) {
        case typeof err === "string":
            // custom application error
            const is404 = err.toLowerCase().endsWith("not found");
            const statusCode = is404 ? 404 : 400;
            return res.json({
                status: statusCode,
                error: err,
                response: null,
            });
        case err.name === "UnauthorizedError":
            // jwt authentication error
            return res.json({
                status: 401,
                error: err,
                response: null,
            });
        default:
            return res.json({
                status: 500,
                error: err,
                response: null,
            });
    }
}
