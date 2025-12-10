const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
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
    description: { type: String },
    deletedAt: {
        type: Date,
        default: null
    }


}, { timestamps: true });

module.exports = mongoose.model('Books', bookSchema);