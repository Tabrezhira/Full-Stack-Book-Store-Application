const router = require("express").Router()
const Book = require("../models/book")
const User = require("../models/user")
const {authenticateToken} = require('./userAuth')

//add book --admin
router.post('/add-book', authenticateToken, async(req,res) => {
    try {
        const {id} = req.headers;
        const user = await User.findById(id);

        if (user.role !=='admin') {
           return res.status(400).json({message:'You are not having access to perform admin'})
        }

        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
        })
        await book.save();
        return res.status(200).json({message: 'Book add successfully'})
    } catch (error) {
        res.status(500).json({message:'Internal server error add-book'}) 
    }

})

//update book --admin

router.put('/update-book', authenticateToken, async(req,res) => {
    try {
        const {bookid} = req.headers;
        await Book.findByIdAndUpdate(bookid,{
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
        })
        return res.status(200).json({message: 'Book update successfully'})
    } catch (error) {
        res.status(500).json({message:'Internal server error update-book'}) 
    }
})

// delete book --admin

router.delete("/delete-book", authenticateToken, async (req, res) => {
    try {
        const {bookid} = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({message: 'Book delete successfully'})
        
    } catch (error) {
        res.status(500).json({message:'Internal server error delete-book'}) 
    }
})

// get all books
router.get('/get-all-books', async(req, res) => {
    try {
        const books = await Book.find().sort({createdAt: -1});
        return res.json({status: 'Sucess', data:books})
        
    } catch (error) {
        res.status(500).json({message:'Internal server error get-all-books'}) 
    }
})

// get recently added books limit 4
router.get('/get-recent-books', async(req, res) => {
    try {
        const books = await Book.find().sort({createdAt: -1}).limit(4);
        return res.json({status: 'Sucess', data:books})
        
    } catch (error) {
        
        res.status(500).json({message:'Internal server error get-recent-books'}) 
    }
})

//get book by id

router.get('/get-books-id/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.json({status: 'Sucess', data:book})
        

    } catch (error) {
        res.status(500).json({message:'Internal server error get-books-id'}) 
    }
})

module.exports = router;
