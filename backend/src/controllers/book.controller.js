const { validationResult } = require('express-validator');
const Book = require('../models/book.model');

const createBook = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            title,
            author,
            category,
            description,
            readingStatus
        } = req.body;
        const userId = req.user._id;

        const titleExists = await Book.findOne({ title, userId, deletedAt: null });
        if (titleExists) {
            return res.status(400).json({ message: 'Title already exists' });
        }

        const newBook = new Book({
            title,
            author,
            category,
            description,
            readingStatus,
            userId
        });

        const result = await newBook.save();
        res.status(201).json({ message: 'Book created successfully', result });
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const updateBook = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const {
            title,
            author,
            category,
            description,
            readingStatus
        } = req.body;
        const userId = req.user._id;

        const book = await Book.findOne({ _id: id, userId, deletedAt: null });
        if (!book) {
            return res.status(404).json({ message: 'Book not found or not authorized' });
        }

        const updateData = {
            title,
            author,
            category,
            description,
            readingStatus
        };

        const result = await Book.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json({ message: 'Book updated successfully', result });
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const book = await Book.findOne({ _id: id, userId, deletedAt: null });
        if (!book) {
            return res.status(404).json({ message: 'Book not found or not authorized' });
        }

        await Book.findByIdAndUpdate(id, { deletedAt: new Date() });
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getBooksByUserId = async (req, res) => {
    try {
        const userId = req.user._id;

        const books = await Book.find({ userId, deletedAt: null });
        res.status(200).json({ books });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getAllBooksForAdmin = async (req, res) => {
    try {
        const result = await Book.find({ deletedAt: null }).populate('userId', 'name email');
        res.status(200).json({ message: "Books fetched successfully", result });
    } catch (error) {
        console.error('Error fetching all books:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getBookById = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findOne({ _id: id, deletedAt: null }).populate('userId', 'name email');
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ book });
    } catch (error) {
        console.error('Error fetching book by ID:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    createBook,
    updateBook,
    deleteBook,
    getBooksByUserId,
    getAllBooksForAdmin,
    getBookById
};
