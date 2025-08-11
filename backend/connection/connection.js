const mongoose = require('mongoose');
require('dotenv').config();

let isConnected = false;

const conn = async () => {
    if (isConnected || mongoose.connection.readyState === 1) {
        isConnected = true;
        return;
    }
        try {
            const uri = process.env.URL || process.env.MONGODB_URI || process.env.MONGO_URI;
            if (!uri) {
                throw new Error('MongoDB connection string not set (expected URL, MONGODB_URI, or MONGO_URI)');
            }
                await mongoose.connect(uri, {
                    serverSelectionTimeoutMS: 5000,
                    socketTimeoutMS: 20000,
                    maxPoolSize: 10
                });
        isConnected = true;
        console.log('Connected to Database');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

// initiate connection on import (safe in serverless due to reuse of instances)
conn();

module.exports = conn;