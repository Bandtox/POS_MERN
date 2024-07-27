const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,  // Ensure email is unique
    },
    password: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;