const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controllers");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.fname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
    body("vehicle.numPlate")
      .isLength({ min: 4 })
      .withMessage("Number Plate must be at least 4 characters"),
    body("vehicle.capicity")
      .isLength({ min: 3 })
      .withMessage("Capicity must be at least 3 characters"),
    body("vehicle.vehicleType")
      .isIn(["car", "bike", "auto"])
      .withMessage("Invalid Type"),
  ],
  captainController.registerCaptain
);

module.exports = router;
