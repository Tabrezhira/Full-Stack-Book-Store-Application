const mongoose = require('mongoose');
require('dotenv').config();

// Global connection cache (safe across serverless instances)
if (!global._mongooseConnection) {
  global._mongooseConnection = { conn: null, promise: null };
}

async function connectDB() {
  // Return existing connection if ready
  if (global._mongooseConnection.conn) {
    return global._mongooseConnection.conn;
  }

  // If no connection promise exists, create one
  if (!global._mongooseConnection.promise) {
    const uri = process.env.URL || process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MongoDB connection string not set (expected URL, MONGODB_URI, or MONGO_URI)');
    }

    global._mongooseConnection.promise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 20000,
      maxPoolSize: 10,
      bufferCommands: false
    }).then((mongooseInstance) => {
      console.log('✅ Connected to Database');
      return mongooseInstance;
    }).catch((err) => {
      console.error('❌ Database connection error:', err);
      global._mongooseConnection.promise = null; // reset on failure
      throw err;
    });
  }

  global._mongooseConnection.conn = await global._mongooseConnection.promise;
  return global._mongooseConnection.conn;
}

module.exports = connectDB;
