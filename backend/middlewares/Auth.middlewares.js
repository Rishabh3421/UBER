const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authuser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token, authorization denied" });

    const isBlacklisted = await userModel.findOne({ token: token})

    if(isBlacklisted) return res.status(401).json({ error: "Token is blacklisted" });

    let payload;
    try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(payload._id);
        if (!user) return res.status(401).json({ error: "User not found" });
        req.user = user;

        return next()
    } catch (error) {
        return res.status(401).json({ error: "Token is not valid" });
    }

}
