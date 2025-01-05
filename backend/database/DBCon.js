const mongoose = require('mongoose')   

async function DbCon(){
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected...");
    } catch (err) {
        console.log(err);
    }
}

module.exports = DbCon;