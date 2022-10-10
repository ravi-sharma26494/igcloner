const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model('Post');

router.get('/allpost', (req,res)=>{
    Post.find()
    .populate('postedBy', "_id name")
    .then((posts)=>{
        res.json({posts})
    }).catch((err)=> console.log(err)) 
})

router.post('/createpost',requireLogin,(req,res)=>{
    const{title, body} = req.body;
    if(!title || !body){
        return res.status(422).json({err: "Please add all the fields"})
    }
// console.log(req.user);
// res.send("Ok")
    req.user.password = undefined;
    const post = new Post({
        title,
        body,
        postedBy: req.user 
    })
    post.save().then((result)=>{
        res.status(200).json({post: result})
    }). catch((err)=> console.log(err))
})

//all the posts by the logged in user
 router.get('/mypost', requireLogin,(req,res)=>{
    Post.find({postedBy: req.user._id}).populate('postedBy','name _id')
    .then((mypost)=>{
        res.status(200).json({mypost})
    }).catch(err=> console.log(err))
 })

module.exports = router;