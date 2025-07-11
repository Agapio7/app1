const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true, 
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,  
        lowercase: true,  
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,  
    },
}, { timestamps: true });  
module.exports = mongoose.model('User', userSchema);
