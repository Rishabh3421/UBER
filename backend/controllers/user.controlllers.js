const { validationResult } = require('express-validator');
const userSchema = require('../models/userModel');
const blacklistingTokenSchema = require('../models/blackListToken.model.js'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// register user
module.exports.registerUser = async (req,res,next) => {
    try{
        const { password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        let user = new userSchema(req.body);
        await user.save();
        res.status(201).json({message: "User registered successfully", user});
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

// login user
module.exports.loginUser = async (req,res,next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    let user = await userSchema.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie("token", token);

    res.status(200).json({token, user})
}

// User Profile

module.exports.getUserProfile = async (req,res,next) => {
 
    res.status(200).json(req.user);
}

// Logout user

module.exports.logoutUser = async (req,res,next) => {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authrization.split(' ')[1];

    await blacklistingTokenSchema.create({ token })

    res.status(200).json({ message: "User logged out successfully" });
}