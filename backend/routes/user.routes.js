const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controlllers.js');
const authuser = require('../middlewares/Auth.middlewares.js');

const {body} = require('express-validator');

// Register route
router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.fname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
],
    userController.registerUser
);

// Login route
router.post("/login",[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
],
    userController.loginUser
)

// Get User Profile

router.get('/profile/:id', authuser.authuser, userController.getUserProfile);

// Logout route
router.get('/logout', authuser.authuser, userController.logoutUser);


module.exports = router;