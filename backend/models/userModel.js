const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   fullname:{
    fname:{
        type:String,
        required:true,
        minlength:[3,'First name must be at least 3 characters long']
    },
    lname:{
        type:String,
        minlength:[3,'Last name must be at least 3 characters long']
    }
   },
   email:{
    type:String,
    required:true,
    unique:true,
    match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format']
   },
   password:{
    type:String,
    required:true,
    select:false,
   },
   socketID:{
    type:String,
    required:true,
    unique:true
   }
})

module.exports = mongoose.model('User',userSchema)
