const captainModel = require("../models/captainModel.js")

module.exports.createCaptain = async({
    fname,lname, email, password, numPlate, capacity, vehicleType, 
}) =>{
    if(!fname   || !lname || !email || !password || !numPlate || !capacity || !vehicleType){
        throw new Error("All fields are required")
    }

    const captain = captainModel.create({
        fullname:{
            fname,
            lname
        },
        email,
        password,
        vehicle:{
            numPlate,
            capacity,
            vehicleType,
        }
    })
}