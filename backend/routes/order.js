const router = require("express").Router()
const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {authenticateToken} = require('./userAuth')
const Book = require('../models/book')
const Order = require('../models/order')


router.post("/place-order", authenticateToken, async (req,res) =>{
    try {
        const{id} = req.headers;
        const{order} = req.body;
        for(const orderData of order) {
            const newOrder = new Order({ user:id, book: orderData._id})
            const orderDataFromDb = await newOrder.save();

            await User.findByIdAndUpdate(id,{
                $push: {orders: orderDataFromDb._id}
            })

            await User.findByIdAndUpdate(id,{
                $pull: {cart: orderData._id}
            })
        }
        return res.json({
            status:"Success",
            message:"Order Placed Successfully"
        })
    } catch (error) {
        res.status(500).json({message:'Internal server error place-order'}) 
    }
})

//get order history of particular user

router.get("/get-order-history", authenticateToken, async(req,res) => {
    try {

        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path:"orders",
            populate: {path: "book"},
        });
        // console.log(userData)
        const orderData = userData.orders.reverse();
        return res.json({
            status: "Success",
            data: orderData,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal server error get-order-history'}) 
        
    }
})

//get all order -- admin
router.get("/get-all-orders", authenticateToken, async(req,res) => {
    try {
        const userData = await Order.find().populate({
            path: "book",
        })
        .populate({
            path:"user",
        })
        .sort({createdAt:-1});
        return res.json({
            status: "Success",
            data: userData,
        })
    } catch (error) {
        res.status(500).json({message:'Internal server error place-order'}) 
    }
})


//update order -- admin
router.get("/update-status/:id", authenticateToken, async(req,res) => {
    try {
        const {id} = req.params;
        await Order.findByIdAndUpdate(id,{status: req.body.status});
        return res.json({
            status: "Success",
            message: "Status Updated Successfully",
        })
    } catch (error) {
        res.status(500).json({message:'Internal server error place-order'}) 
    }
})


module.exports = router    