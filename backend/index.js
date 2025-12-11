const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./src/config/dataBase');
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
    connectDB();
});