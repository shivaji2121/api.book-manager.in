const { body } = require('express-validator');

const registerValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('gender').isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other'),
];

const loginValidation = [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required'),
];

module.exports = {
    registerValidation,
    loginValidation
};