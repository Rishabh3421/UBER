const userSchema = require("../models/userSchema")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

// create a new token
userSchema.methods.generateauthtoken = function(){
    const token = jwt.sign({_id:this._id}, process.env.JWT_SECRET, { expiresIn: '24h' })
    this.tokens = this.tokens.concat({token})
    return token
}

// validate the password
userSchema.methods.comparepassword = async function(password){
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        console.error("Error comparing password:", error)
        return false
    }
}

// hash the password
userSchema.methods.hashpassword = async function () {
    try {
        this.password = await bcrypt.hash(this.password, 10)
    } catch (error) {
        console.error("Error hashing password:", error)
    }
}
