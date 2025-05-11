const express = require('express');
const path = require('path');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const connectDB = require('./configs/db');
require('dotenv').config();

const app = express();

// Connect
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser);
app.use(express.static(path.join(__dirname, "piblic")));
app.set("view engine", );

app.get("/", (req, res) => {
    res.send("Hey")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});