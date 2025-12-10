const express = require('express');
const connectDB = require('./src/config/dataBase');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./src/routes/user.routes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());



const PORT = process.env.PORT || 3000;

app.use('/auth', userRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to Book Manager API");
});

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
    connectDB();
})