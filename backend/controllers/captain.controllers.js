const captainModel = require("../models/captainModel");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

module.exports.registerCaptains = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    fullName,
    email,
    password,
    vehicle,
    phoneNumber,
    licenseNumber,
    vehicleType,
  } = req.body;
  
  const existingCaptain = await captainModel.findOne({ email });
  if (existingCaptain) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const hashpassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    fullName,
    email,
    password: hashpassword,
    vehicle,
    phoneNumber,
    licenseNumber,
    vehicleType,
  });

  const token = captain.generateAuthToken();
  res.status(201).json({ token, captain });
};
