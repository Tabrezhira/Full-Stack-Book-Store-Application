const router = require("express").Router()
const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {authenticateToken} = require('./userAuth')


// add book to cart
router.put("/add-book-to-cart", authenticateToken, async (req, res) => {
    try {
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);

        const isBookCart= userData.carts.includes(bookid);

        if(isBookCart)
        {
            res.status(200).json({message:'Book is already in carts'}) 
        }else{
            await User.findByIdAndUpdate(id, {$push: {carts:bookid}})
            res.status(200).json({message:'Book is add into carts'}) 
        }

    } catch (error) {
        res.status(500).json({message:'Internal server error add-book-to-cart'}) 
    }
})


// remove book to cart
router.delete("/remove-book-from-cart/:cartid", authenticateToken, async (req, res) => {
    try {
        const {cartid} = req.params;
        const {id} = req.headers;
        const userData = await User.findById(id);

        const isBookFavourite = userData.carts.includes(cartid);

        if(isBookFavourite)
        {
            await User.findByIdAndUpdate(id, {$pull: {carts:cartid}})
            return res.status(200).json({message:'Book removed from carts'}) 
        }
        res.status(200).json({message:'Please add the book to carts first'}) 
    } catch (error) {
        // console.log(error)
        res.status(500).json({message:'Internal server error remove-book-from-cart'}) 
    }
})

// get cart books of a particular user
router.get("/get-cart-books", authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate('carts');
        const cartsBooks = userData.carts;
        return res.json({
            status: "Success",
            data: cartsBooks,
        })
    } catch (error) {
        res.status(500).json({message:'Internal server error get-cart-books'}) 
    }
})
module.exports = router    