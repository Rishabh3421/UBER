const userModel = require('../models/userModel.js');

module.exports.createUser = async({
    fname,
    lname,
    email,
    password
})=>{
    if(!fname || !lname || !email || !password){
        throw new Error('All fields are required');
    }
    
    let user = await userModel.findOne({email});
    
    if(user){
        throw new Error('User already exists');
    }
    
    user = await userModel.create({
        'fullname.fname': fname,
        'fullname.lname': lname,
        email,
        password
    });

    return user;
}