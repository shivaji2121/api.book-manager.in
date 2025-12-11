const { body } = require('express-validator');

const validateBookCreation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 1, max: 255 })
        .withMessage('Title must be between 1 and 255 characters')
        .matches(/^[a-zA-Z0-9\s\-:,.!?'"()]+$/)
        .withMessage('Title contains invalid characters'),

    body('author')
        .trim()
        .notEmpty()
        .withMessage('Author is required')
        .isLength({ min: 1, max: 255 })
        .withMessage('Author must be between 1 and 255 characters')
        .matches(/^[a-zA-Z\s\-.']+$/)
        .withMessage('Author name contains invalid characters'),

    body('category')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Category must not exceed 100 characters'),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Description must not exceed 1000 characters'),

    body('readingStatus')
        .optional()
        .isIn(['To Read', 'Reading', 'Completed', 'On Hold'])
        .withMessage('Reading status must be one of: To Read, Reading, Completed, On Hold')
];

const validateBookUpdate = [
    body('title')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Title cannot be empty')
        .isLength({ min: 1, max: 255 })
        .withMessage('Title must be between 1 and 255 characters')
        .matches(/^[a-zA-Z0-9\s\-:,.!?'"()]+$/)
        .withMessage('Title contains invalid characters'),

    body('author')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Author cannot be empty')
        .isLength({ min: 1, max: 255 })
        .withMessage('Author must be between 1 and 255 characters')
        .matches(/^[a-zA-Z\s\-.']+$/)
        .withMessage('Author name contains invalid characters'),

    body('category')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Category must not exceed 100 characters'),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Description must not exceed 1000 characters'),

    body('readingStatus')
        .optional()
        .isIn(['To Read', 'Reading', 'Completed', 'On Hold'])
        .withMessage('Reading status must be one of: To Read, Reading, Completed, On Hold')
];

module.exports = {
    validateBookCreation,
    validateBookUpdate
};
