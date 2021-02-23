const jwt = require("express-jwt");
const { secret } = require("config.json");
const db = require("_helpers/db");

module.exports = authorize;

function authorize() {
    return [
        // authenticate JWT token and attach decoded token to request as req.manager
        jwt({ secret, algorithms: ["HS256"] }),

        // attach full manager record to request object
        async (req, res, next) => {
            // get manager with id from token 'sub' (subject) property
            const manager = await db.Manager.findByPk(req.user.sub);

            // check manager still exists
            if (!manager)
                return res.status(401).json({ message: "Unauthorized" });

            // authorization successful
            req.manager = manager.get();
            next();
        },
    ];
}
