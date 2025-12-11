const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
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
    category: {
        type: String,
        default: 'Uncategorized'
    },
    description: {
        type: String,
        maxLength: [1000, 'Description cannot exceed 1000 characters']
    },
    readingStatus: {
        type: String,
        enum: ['To Read', 'Reading', 'Completed', 'On Hold'],
        default: 'To Read'
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Books', bookSchema);