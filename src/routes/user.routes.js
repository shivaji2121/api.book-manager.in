const express = require('express');
const userRouter = express.Router();
const { registerUser, login } = require('../controllers/auth.controller');
const { registerValidation, loginValidation } = require('../validation/user.validation');
const isAuthorized = require('../middleware/isAuthorized');

userRouter.post('/register', registerValidation, registerUser);
userRouter.post('/login', loginValidation, login);

module.exports = userRouter;