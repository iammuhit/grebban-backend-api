const JsonWebToken = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        let [type, token] = req.header('Authorization').trim().split(' ');

        req.user = JsonWebToken.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
        return res.json({
            status: 'error',
            message: 'The token is invalid.'
        });
    }

    next();
};