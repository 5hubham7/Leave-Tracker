const config = require("../config.json");
const expressJwt = require("express-jwt");
const managerService = require("../manager/manager.service");

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, algorithms: ["HS256"], isRevoked }).unless({
        path: ["/managers/authenticate", "/managers/register"],
    });
}

async function isRevoked(req, payload, done) {
    const manager = await managerService.getById(payload.sub);

    if (!manager) {
        return done(null, true);
    }
    done();
}
