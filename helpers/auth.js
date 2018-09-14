const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports.unauthorizedMiddleware = function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({"error": 'Token is not provided or invalid'});
    }
};

module.exports.generateToken = function(id, username) {
    const JWTToken = jwt.sign({
            username: username,
            id: id
        },
        config.getJWTSecret(),
        {
            expiresIn: '24h'
        });
    return JWTToken;
};
