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

    body('isbn')
        .optional()
        .trim()
        .matches(/^(?:\d{10}|\d{13}|(?:\d{1,5}-\d{1,7}-\d{1,7}-[\dX])|(?:\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-\d))$/)
        .withMessage('Invalid ISBN format. Use ISBN-10 or ISBN-13'),

    body('publisher')
        .optional()
        .trim()
        .isLength({ max: 255 })
        .withMessage('Publisher must not exceed 255 characters'),

    body('publicationYear')
        .optional()
        .isInt({ min: 1000, max: new Date().getFullYear() + 1 })
        .withMessage(`Publication year must be between 1000 and ${new Date().getFullYear() + 1}`),

    body('pages')
        .optional()
        .isInt({ min: 1, max: 100000 })
        .withMessage('Pages must be between 1 and 100000'),

    body('language')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Language must not exceed 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Language contains invalid characters'),

    body('coverImage')
        .optional()
        .trim()
        .isURL({ protocols: ['http', 'https'], require_protocol: true })
        .withMessage('Cover image must be a valid URL'),

    body('rating')
        .optional()
        .isFloat({ min: 0, max: 5 })
        .withMessage('Rating must be between 0 and 5'),

    body('readingStatus')
        .optional()
        .isIn(['To Read', 'Reading', 'Completed', 'On Hold'])
        .withMessage('Reading status must be one of: To Read, Reading, Completed, On Hold'),

    body('notes')
        .optional()
        .trim()
        .isLength({ max: 2000 })
        .withMessage('Notes must not exceed 2000 characters')
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

    body('isbn')
        .optional()
        .trim()
        .matches(/^(?:\d{10}|\d{13}|(?:\d{1,5}-\d{1,7}-\d{1,7}-[\dX])|(?:\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-\d))$/)
        .withMessage('Invalid ISBN format. Use ISBN-10 or ISBN-13'),

    body('publisher')
        .optional()
        .trim()
        .isLength({ max: 255 })
        .withMessage('Publisher must not exceed 255 characters'),

    body('publicationYear')
        .optional()
        .isInt({ min: 1000, max: new Date().getFullYear() + 1 })
        .withMessage(`Publication year must be between 1000 and ${new Date().getFullYear() + 1}`),

    body('pages')
        .optional()
        .isInt({ min: 1, max: 100000 })
        .withMessage('Pages must be between 1 and 100000'),

    body('language')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Language must not exceed 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Language contains invalid characters'),

    body('coverImage')
        .optional()
        .trim()
        .isURL({ protocols: ['http', 'https'], require_protocol: true })
        .withMessage('Cover image must be a valid URL'),

    body('rating')
        .optional()
        .isFloat({ min: 0, max: 5 })
        .withMessage('Rating must be between 0 and 5'),

    body('readingStatus')
        .optional()
        .isIn(['To Read', 'Reading', 'Completed', 'On Hold'])
        .withMessage('Reading status must be one of: To Read, Reading, Completed, On Hold'),

    body('notes')
        .optional()
        .trim()
        .isLength({ max: 2000 })
        .withMessage('Notes must not exceed 2000 characters')
];

module.exports = {
    validateBookCreation,
    validateBookUpdate
};
