const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    author: {
        type: String,
        required: [true, "Author is required"]
    },
    category: { type: String },
    description: { type: String, maxLength: [1000, 'Description cannot exceed 100 characters'] },
    deletedAt: {
        type: Date,
        default: null
    }


}, { timestamps: true });

module.exports = mongoose.model('Books', bookSchema);