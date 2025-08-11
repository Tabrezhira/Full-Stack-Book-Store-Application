const mongoose = require('mongoose');
require('dotenv').config();

let isConnected = false;

const conn = async () => {
    if (isConnected || mongoose.connection.readyState === 1) {
        isConnected = true;
        return;
    }
    try {
        await mongoose.connect(process.env.URL);
        isConnected = true;
        console.log('Connected to Database');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

// initiate connection on import (safe in serverless due to reuse of instances)
conn();

module.exports = conn;