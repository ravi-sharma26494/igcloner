const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model('Post');

router.get('/allpost', requireLogin, (req,res)=>{
    Post.find()
    .populate('postedBy', "_id name")
    .then((posts)=>{
        res.json({posts})
    }).catch((error)=> console.log(error)) 
})

router.post('/createpost',requireLogin,(req,res)=>{
    const{title, body, pic} = req.body;
    console.log(req.body);
    console.log(`This is your data from request: ${req.body}`)
    //debugger
    if(!title || !body || !pic){
        return res.status(422).json({error: "Please Upload an Image to add your post"});
    }
    req.user.password = undefined;
    const post = new Post({
        title,
        body,
        photo:pic,
        postedBy: req.user 
    })
    post.save().then((result)=>{
        res.status(200).json({post: result})
    }). catch((error)=> console.log(error))
})

//all the posts by the logged in user
 router.get('/mypost', requireLogin,(req,res)=>{
    Post.find({postedBy: req.user._id}).populate('postedBy','name _id')
    .then((mypost)=>{
        res.status(200).json({mypost})
    }).catch(error=> console.log(error))
 })

module.exports = router;