const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controlllers.js');

const {body} = require('express-validator');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.fname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
],
    userController.registerUser
);

module.exports = router;