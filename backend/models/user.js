const mongoose = require('mongoose')

const user = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    address:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    avatar:{
        type:String,
        default:'https://cdn-icons-png.flaticon.com/128/3177/3177440.png'
    },
    role:{
        type: String,
        default: "user",
        enum: ["user","admin"],
    },
    favorites:[
        {
            type:mongoose.Types.ObjectId,
            ref: 'book',
        },
    ],
    carts:[
        {
            type:mongoose.Types.ObjectId,
            ref: 'book',
        },
    ],
    orders:[
        {
            type:mongoose.Types.ObjectId,
            ref: 'order',
        },
    ],

},{timestamps: true})

module.exports = mongoose.model('user', user)