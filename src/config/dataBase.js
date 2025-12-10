const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "bookmanger"
        });
        console.log("DB connected successfully");
    } catch (error) {
        console.log("DB connection failed", error);
    }
}

module.exports = connectDB;