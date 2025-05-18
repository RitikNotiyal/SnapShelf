const mongoose = require('mongoose');
const dbgr = require('debug')('development:db');
require('dotenv').config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URL}/snapshelf`);
        dbgr(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        dbgr(`Error: ${err.message}`);
        process.exit(1); // Exit process if DB connection fails
    }
};

module.exports = connectDB;
