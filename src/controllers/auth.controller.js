
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const registerUser = async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password, gender } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({ name, email, gender, password: hashedPassword, });

        res.status(201).json({ message: 'User registered successfully', user: result });

    } catch (error) {
        console.error('error in register controller:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });

    }
}


const login = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });


        res.status(200).json({ message: 'Login successful', user, token });

    } catch (error) {
        console.error('error in login controller:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
module.exports = {
    registerUser,
    login
};
