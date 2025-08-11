const express = require("express")
const app = express();
const cors = require("cors")

require('dotenv').config()
require("./connection/connection")
const user = require('./routes/user');
const book = require("./routes/book");
const Favorites = require("./routes/favourite")
const cart = require("./routes/cart")
const Order = require("./routes/order")
app.use(cors());
app.use(express.json());

// routes
app.use('/api/v1', user);
app.use('/api/v2', book);
app.use('/api/v3', Favorites);
app.use('/api/v3', cart);
app.use('/api/v3', Order);

//
app.get('/', (req, res)=> {
    res.send('Hello from backend side')
})

// export app for serverless; only listen when run directly (local dev)
if (require.main === module) {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })
}

module.exports = app;