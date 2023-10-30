const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, "10", (error, user) => {
            if (error) {
                return res.status(403).json({
                    status: 403,
                    message: "Token isn't valid!",
                });
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({
            status: 401,
            message: "You're not authenticated!",
        });
    }
};

module.exports = verifyToken;
