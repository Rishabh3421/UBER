const userSchema = require('../models/userModel');

// register user
module.exports.registerUser = async (req,res,next) => {
    try{
        let user = new userSchema(req.body);
        await user.save();
        res.status(201).json({message: "User registered successfully", user});
    }catch(err){
        res.status(500).json({error: err.message});
    }

    const {fname,lname, email, password} = res.body;

    const hashedPassword = await user.hashedPassword(password);
    res.status(201).json({fname,lname, email, password: hashedPassword});

    const  tokens = user.generateauthtoken();
    res.status(200).json({tokens,user});
}
