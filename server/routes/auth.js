const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt= require('bcrypt')
const jwt =  require('jsonwebtoken');
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')

// router.get('/protected',requireLogin,(req,res)=>{
// res.send('Hello');
// })

router.post('/signup', (req,res)=>{
    const {name, email, password} = req.body;
    if(!email || !name || !password){
        return res.status(422).json({ error: "Please add all the fields"});
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({ error: "User Already Registed with this email"});  
        }
        //hash the incomming password
        bcrypt.hash(password, 12)
        .then((hashedPassword)=>{
            const user = new User({
                name,
                email,
                password: hashedPassword
                
            })
            //console.log(user)
            //save the user
            user.save()
            .then((user)=>{ 
                res.json({message: "User Saved successfully"})
            })
            .catch((err)=> {
                console.log(err)
            })
        })
        
    })
    .catch((err)=> console.log(err))
    //res.status(200).json({ message : "Success"})
    
})

router.post('/signin', (req,res)=>{
    const {name,email,password} = req.body;
    if(!email || !password){
       return res.status(422).json({error: "Please add email or password"})
    }
    //find the user with the email
    User.findOne({email: email})
    .then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error: "Invalid email or password"})
        }
        //if found compare the password
        bcrypt.compare(password, savedUser.password)
        .then((doMatch)=>{
            if(doMatch){
                // res.json({message:"Signin Successful"});
                const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
                const {_id, name, email} =savedUser;
                res.json({token,user:{_id,name,email}})
            } else {
                return res.status(422).json({error: "Invalid email or password"})
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
    })
})
module.exports = router;