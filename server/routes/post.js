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
    //console.log(title, body, req.body.photo)
    //return;
    // console.log(req.body)
    //console.log(req.body.title);
    if(!req.body.photo){
        return res.status(422).json({err: "Upload and Image to post"});
    }
    req.user.password = undefined;
    const post = new Post({
        title,
        body,
        photo:req.body.photo,
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