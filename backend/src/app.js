const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const bookRouter = require('./routes/book.routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/auth', userRoutes);
app.use('/books', bookRouter);

app.get('/', (req, res) => {
    res.send("Welcome to Book Manager API");
});

module.exports = app;
