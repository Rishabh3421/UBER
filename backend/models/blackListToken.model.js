const mongoose = require('mongoose');

const blacklistingTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires : 86400 // 24 hours in seconds
    }
});

module.exports = mongoose.model('BlacklistingToken', blacklistingTokenSchema);
