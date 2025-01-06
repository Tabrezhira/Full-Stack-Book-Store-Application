const router = require("express").Router()
const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {authenticateToken} = require('./userAuth')

// add book to favourite
router.put("/add-book-to-favuraite", authenticateToken, async (req, res) => {
    try {
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);

        const isBookFavourite = userData.favorites.includes(bookid);

        if(isBookFavourite)
        {
            res.status(200).json({message:'Book is already in favourite'}) 
        }
        await User.findByIdAndUpdate(id, {$push: {favorites:bookid}})
        res.status(200).json({message:'Book is add into favourite'}) 
    } catch (error) {
        res.status(500).json({message:'Internal server error add-book-to-favuraite'}) 
    }
})

// remove book to favourite
router.delete("/remove-book-from-fav", authenticateToken, async (req, res) => {
    try {
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);

        const isBookFavourite = userData.favorites.includes(bookid);

        if(isBookFavourite)
        {
            await User.findByIdAndUpdate(id, {$pull: {favorites:bookid}})
            return res.status(200).json({message:'Book removed from favourite'}) 
        }
        res.status(200).json({message:'Please add the book to favourite first'}) 
    } catch (error) {
        res.status(500).json({message:'Internal server error add-book-to-favuraite'}) 
    }
})

// get favourite books of a particular user
router.get("/get-favourite-books", authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate('favorites');
        const favouriteBooks = userData.favorites;
        return res.json({
            status: "Success",
            data: favouriteBooks,
        })
    } catch (error) {
        res.status(500).json({message:'Internal server error add-book-to-favuraite'}) 
    }
})

module.exports = router   