const bcrypt = require('bcryptjs/dist/bcrypt');
const express = require('express');
const User = require('../models/userModel');
const router = express.Router();

router.get('./', (req, res)=>{
    console.log("Hello here")
    res.send('I am at auth.js')
})

router.post('/register', async (req, res)=>{
    const {name, email, password, phone} = req.body
    
    if(name && email && password && phone){
        const newUser = new User({name, email, password, phone})
        
        const userExists = await User.findOne({email})
        
        if(userExists){
            return res.status(400).json({error: "User is already registered"})
        }
        console.log("hello the user already exists", userExists)

        const userRegistered = newUser.save()


        if(userRegistered){
            return res.json({success: "User is registered successfully"})
        }
        else{
            return res.status(500).json({error: "Oops! some error occured...try again!!"})
        }


    }else{
        res.json({error: "Please fill all details"})
    }
})

router.post('/login', async (req, res)=>{
    const {email, password} = req.body
    
    if(email && password){
        const userFound = await User.findOne({email: email})
        
        if(userFound){
            const passwordMatch = await bcrypt.compare(password, userFound.password)

            if(passwordMatch){
                res.json({message: "User found..Login Successful"})
            }
            else{
                res.status(401).json({error: "Invalid credentials"})
            }

        }
        else{
             res.status(401).json({error: "Invalid credentials"})
        }
        
    }else{
        res.json({error: "Please fill all details"})
    }
})

module.exports = router