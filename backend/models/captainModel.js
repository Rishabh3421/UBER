const mongoose = require("mongoose");
const generateauthtoken = require("../utils/utils.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
  fullname: {
    fname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
    },
    lname: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketID: {
    type: String,
    required: true,
    unique: true,
  },
  riderStatus: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    numPlate: {
      type: String,
      required: true,
      minlength: [3, "Number Plate must be at least 3 characters long"],
    },
    capacity: {
      type: Number,
      required: true,
      minlength: [1, "Capacity must be at least 1 characters long"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "auto", "bike"],
      default: "car",
    },
  },
  location: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
});


captainSchema.methods.generateauthtoken = function (){
    const token  = jwt.sign({ _id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'})
    return token;
}
captainSchema.methods.comparepassword = async function (password){
   return await bcrypt.compare(password, this.password);
}
captainSchema.methods.hashpassword = async function (password){
   return await bcrypt.hash(password, 10)
}



module.exports = mongoose.model("Captain", captainSchema);


