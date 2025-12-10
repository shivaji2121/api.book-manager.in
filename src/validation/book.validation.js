const { body } = require('express-validator');

const validateBookCreation = [
    body('title')
        .isString()
        .isLength({ min: 1, max: 255 })
        .withMessage('Title is required and must be between 1 and 255 characters'),
    body('author')
        .isString()
        .isLength({ min: 1, max: 255 })
        .withMessage('Author is required and must be between 1 and 255 characters'),
    body('category')
        .optional()
        .isString()
        .isLength({ max: 100 })
        .withMessage('Category must be a string and no more than 100 characters'),
    body('description')
        .optional()
        .isString()
        .isLength({ max: 100 })
        .withMessage('Description must be a string and no more than 100 characters')
];

const validateBookUpdate = [
    body('title')
        .optional()
        .isString()
        .isLength({ min: 1, max: 255 })
        .withMessage('Title must be between 1 and 255 characters'),
    body('author')
        .optional()
        .isString()
        .isLength({ min: 1, max: 255 })
        .withMessage('Author must be between 1 and 255 characters'),
    body('category')
        .optional()
        .isString()
        .isLength({ max: 100 })
        .withMessage('Category must be a string and no more than 100 characters'),
    body('description')
        .optional()
        .isString()
        .isLength({ max: 1000 })
        .withMessage('Description must be a string and no more than 1000 characters')
];

module.exports = {
    validateBookCreation,
    validateBookUpdate
};
