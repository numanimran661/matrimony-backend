const mongoose = require('mongoose');

const resetTokenSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
});

// Create a model for the reset tokens collection
module.exports = mongoose.model('ResetToken', resetTokenSchema, 'reset tokens');