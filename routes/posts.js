const express = require('express')
const router = express.Router()
const Post = require('../models/Posts')


//Get all the Posts
router.get('/',async(req,res)=>{
    try{
        const posts = await Post.find()
        res.json(posts)
    }catch(err){
        res.send({message:err})
    }
})

//Submit A Post
router.post('/',async(req,res)=>{
    const post = new Post({
        title : req.body.title,
        description :req.body.description
    })

    try{
        const savedPost = await post.save()
        res.json(savedPost)
    }catch(err){
        res.json({message : err})
    }
})

//Get a specific post
router.get('/:postId',async(req,res)=>{
    try{
        const post = await Post.findById(req.params.postId)
        res.json(post)
    }catch(err){
        res.json({message : err})
    }
})

//Delete a specific post
router.delete('/:postId',async(req,res)=>{
    try{
        const removedPost = await Post.remove({_id:req.params.postId})
        res.json(removedPost)
    }catch(err){
        res.json({message : err})
    }
})

//update the post
router.patch('/:postId',async (req,res)=>{
    try{
        const updatePost = await Post.updateOne(
            {_id: req.params.postId},
            {$set : {title : req.body.title}}
        )
        res.json(updatePost)
    }
    catch(err){
        res.json({message : err})
    }
})

module.exports = router