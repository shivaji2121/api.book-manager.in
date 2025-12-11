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
    isbn: {
        type: String,
        trim: true
    },
    publisher: {
        type: String,
        trim: true
    },
    publicationYear: {
        type: Number,
        min: [1000, 'Invalid publication year'],
        max: [new Date().getFullYear() + 1, 'Publication year cannot be in the future']
    },
    pages: {
        type: Number,
        min: [1, 'Pages must be at least 1']
    },
    language: {
        type: String,
        default: 'English'
    },
    coverImage: {
        type: String,
        trim: true
    },
    rating: {
        type: Number,
        min: [0, 'Rating must be between 0 and 5'],
        max: [5, 'Rating must be between 0 and 5'],
        default: 0
    },
    readingStatus: {
        type: String,
        enum: ['To Read', 'Reading', 'Completed', 'On Hold'],
        default: 'To Read'
    },
    notes: {
        type: String,
        maxLength: [2000, 'Notes cannot exceed 2000 characters']
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Books', bookSchema);