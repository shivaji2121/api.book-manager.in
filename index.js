const express = require('express');
const connectDB = require('./src/config/dataBase');
const app = express();

const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send("Welcome to Book Manager API");
});

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
    connectDB();
})