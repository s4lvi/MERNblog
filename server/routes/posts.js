const express = require('express');
const Post = require('../model/Post');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', (req, res) => {
    Post.find().then(posts => {res.json({posts})})
})

router.post('/', auth, (req, res) =>{
    const newPost = new Post({
        author: req.body.author,
        content: req.body.content
    });

    newPost.save().then(post => res.json(post));
})

module.exports = router;