const express = require('express');
const path = require('path');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const connectDB = require('./configs/db');
require('dotenv').config();
const adminRoutes = require('./routes/adminRoutes');
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');

const app = express();

//  Connect to DB
connectDB();

//  Set View Engine
app.set('view engine', 'ejs');

//  Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//  Logger Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

//  Routes
app.get('/', (req, res) => {
    res.send('Hey');
});

app.use('/admin', adminRoutes);
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
