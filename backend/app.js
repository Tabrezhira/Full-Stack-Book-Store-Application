const express = require("express")
const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
const connectDB = require("./connection/connection");

require('dotenv').config()
const user = require('./routes/user');
const book = require("./routes/book");
const Favorites = require("./routes/favourite")
const cart = require("./routes/cart")
const Order = require("./routes/order")

app.use(cors());
app.use(express.json());
// Ensure DB is connected on each request (no-op if already connected)
app.use(async (req, res, next) => {
  try { await connectDB(); } catch (e) {}
  next();
});
// routes
app.use('/api/v1', user);
app.use('/api/v2', book);
app.use('/api/v3', Favorites);
app.use('/api/v3', cart);
app.use('/api/v3', Order);

//
app.get('/', (req, res) => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  const state = mongoose.connection.readyState;
  const proto = req.headers['x-forwarded-proto'] || req.protocol;
  const host = req.headers['x-forwarded-host'] || req.get('host');
  const baseUrl = `${proto}://${host}`;
  res.status(200).json({
    message: 'Hello from backend side',
    mongo: states[state] || 'unknown',
    state,
    api: {
      base: baseUrl,
      v1: `${baseUrl}/api/v1`,
      v2: `${baseUrl}/api/v2`,
      v3: `${baseUrl}/api/v3`
    },
    time: new Date().toISOString()
  });
});

// ✅ Optional: run locally
if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

module.exports = app;