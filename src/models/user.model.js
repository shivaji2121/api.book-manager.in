const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: [true, "Gender is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
