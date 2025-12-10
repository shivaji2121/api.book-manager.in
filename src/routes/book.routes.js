const express = require('express');
const { createBook, updateBook, deleteBook, getBooksByUserId, getAllBooksForAdmin, getBookById } = require('../controllers/book.controller');
const { isAuthenticated, isAdmin } = require('../middleware/isAuthorized');
const { validateBookCreation, validateBookUpdate } = require('../validation/book.validation');

const bookRouter = express.Router();

bookRouter.post('/create', isAuthenticated, validateBookCreation, createBook);
bookRouter.put('/update/:id', isAuthenticated, validateBookUpdate, updateBook);
bookRouter.delete('/delete/:id', isAuthenticated, deleteBook);
bookRouter.get('/my-books', isAuthenticated, getBooksByUserId);
bookRouter.get('/all-books', isAuthenticated, isAdmin, getAllBooksForAdmin);
bookRouter.get('/:id', isAuthenticated, getBookById);

module.exports = bookRouter;
