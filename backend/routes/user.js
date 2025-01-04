const router = require("express").Router()
const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {authenticateToken} = require('./userAuth')


//Sign Up
router.post('/sign-up',async(req,res) => {
    try {
        const { username, email, password, address} = req.body;

        // check username Length is more than 4
        if(username.length < 4){
            return res.status(400).json({message: "Username length should be greather than 3"})
        }

        //check username already exists ?

        const existingUsername = await User.findOne({username: username});
        if(existingUsername){
            console.log(existingUsername)
            return res.status(400).json({message: "Username already exists"})
        }

        // check email already exits ?

        const existingEmail = await User.findOne({email: email});
        if(existingEmail){
            return res.status(400).json({message: "Email already exists"})
        }

        // check password length
        if(password.length <= 5){
            return res.status(400).json({message: "Password length should be greater than 5"})
        }

        // check address length
        if(address.length <= 5){
            return res.status(400).json({message: "Address length should be greater than 5"})
        }

        const hassPass = await bcrypt.hash(password, 10);

        const newUser = new User ({
            username:username,
            email:email,
            password:hassPass,
            address:address,
        });
        await newUser.save();
        return res.status(200).json({message:'Sign-up successfully'})


        
    } catch (error) {

        res.status(500).json({message:'Internal server error sign-up'})
    }
})

//sign in

router.post('/sign-in', async(req, res) => {
    try {
        const { email, password } = req.body;
     
        const existingUser = await User.findOne({email: email});

        if(!existingUser){
            return res.status(400).json({message: "Email not exists"})
        }

        await bcrypt.compare(password, existingUser.password, (error , data) => {
            if (error) {
                return res.status(500).json({ message: 'Server error' }); // Handle error cases
            }
        
            if (data) {
                const authClaims = [{name: existingUser.username},{role: existingUser.role}]
                const token = jwt.sign({authClaims}, "bookStore123", {
                    expiresIn: "30d"
                })
                return res.status(200).json({id:existingUser._id, name: existingUser.username ,role: existingUser.role, token: token}); // Correct placement
            } else {
                return res.status(400).json({ message: 'Invalid Credentials' }); // Correct placement
            }
        })


        
    } catch (error) {
        res.status(500).json({message:'Internal server error sign-in'})
    }

})

//get-user-information

router.get('/get-user-information',authenticateToken, async(req, res) => {
    try {
        const {id} = req.headers;
        const data = await User.findById(id).select('-password');
        return res.status(200).json(data);r
        
    } catch (error) {
        res.status(500).json({message:'Internal server error get-user-information'}) 
    }
})

//update address
router.put('/update-address', authenticateToken, async(req, res) => {
    try {
        const {id} = req.headers;
        const {address} = req.body;
        console.log(address,id)
        await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message: 'Address update'})
        
    } catch (error) {
        res.status(500).json({message:'Internal server error update-address'}) 
    }
})

module.exports = router    

const text = "hi"