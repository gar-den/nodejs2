// APIs
const express = require('express');
const Posts = require("../schemas/posts");
const Comments = require("../schemas/comments");
const authMiddleware = require('../middlewares/auth-middleware');

const crypto = require('crypto'); // import crypto

const router = express.Router();  // making router

router.get("/", async (req, res, next) => {
    try {
        const posts = await Posts.find({ }).sort("-postId");  // find from query. sort as goodsId
    
        res.json({ posts: posts });  // jsonify
    } catch (err) {
        console.error(err);
    
        next(err);
    }
  });

router.get("/:postId", async (req, res) => {
    const { postId } = req.params;
    const posts = await Posts.findOne({ postId: postId });

    res.json({ detail: posts });
});

router.post('/', authMiddleware, async(req, res) => {
    const title = req.body.title;
    const date = new Date(req.body.date);
    const name = res.locals.user.nickname;
    let password = req.body.password;
    password = crypto.createHmac('sha256', password).update('hashhashhash!').digest('hex');
    const content = req.body.content;

    let newPostId = 1;

    try {
        last = await Posts.find({}).sort({postId:-1}).limit(1);
        newPostId = last[0].postId + 1;
    } catch(err) {
        newPostId = 1;
    }

     await Posts.create({ postId: newPostId, title: title, date: new Date(), name: name, password: password, post: content });

    res.send({ result: "success" });
})

router.put('/:postId', async (req, res) => {
    const { postId } = req.params;
    const title = req.body.title;
    const name = req.body.name;
    const content = req.body.content;

    const isGoodInPost = await Posts.find( {postId} );

    if (isGoodInPost.length) {
        await Posts.updateOne({ postId }, {$set: {title: title, date: new Date(), name: name, post: content }}); 
    }

    res.send({ result: "success" });
})

router.delete('/:postId', async (req, res) => {
    const { postId } = req.params;

    const isGoodInPost = await Posts.find( {postId} );

    if (isGoodInPost.length > 0) {
        await Posts.deleteOne({ postId });
    }

    const comments = await Comments.find({ postId });

    for (let i = 0; i < comments.length; i ++) {
        await Comments.deleteOne({ _id: comments[i]._id })
    }

    res.send({ result: "success" });
})

module.exports = router;