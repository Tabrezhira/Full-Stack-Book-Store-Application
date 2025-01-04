const e = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const conn = async() =>{
    try {
        await mongoose.connect(`${process.env.URL}`);
        console.log("Connected to Database")
        
    } catch (error) {
        console.log(error)
    }
}
conn()