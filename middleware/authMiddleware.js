const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer Token

    if (!token) {
        return res.status(403).json({ message: "No token provided. Redirecting to landing page." });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized. Redirecting to landing page." });
        }
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
