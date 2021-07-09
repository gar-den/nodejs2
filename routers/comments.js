const express = require('express');
const Comments = require("../schemas/comments");
const authMiddleware = require('../middlewares/auth-middleware');

const router = express.Router();  // making router

router.get("/:postId", async (req, res, next) => {
    const postId = req.params.postId;

    const comments = await Comments.find({ postId: postId });

    res.json({ comments: comments });
});

router.post("/:postId", authMiddleware, async (req, res, next) => {
    /*
    postId: Number,
    userId: String,
    date: String,
    comment: String,
    */

    const postId = req.params.postId;
    const { comment } = req.body;
    const user = res.locals.user;

    await Comments.create({ postId: postId, userName: user.nickname, date: new Date(), comment: comment });

    res.send({ message: "success" });
});

router.get("/one/:commentId", authMiddleware, async (req, res, next) => {
    const { commentId } = req.params;

    const comment = await Comments.findOne({ _id: commentId });

    // 댓글 작성자가 아니라면 실패 보내기
    if (comment.userName != res.locals.user.nickname) {
        res.send ({ errorMessage: "access denied" });

        return;
    }

    res.json({ comment: comment });
});

router.patch("/:postId", authMiddleware, async (req, res, next) => {
    const { commentId, comment } = req.body;

    const isCommentInComments = await Comments.findOne({ _id: commentId });

    if (isCommentInComments) {
        await Comments.updateOne({ _id: commentId }, {$set: {comment}});
    }

    res.send({ })
})

router.delete("/:postId", authMiddleware, async (req, res, next) => {
    const { postId } = req.params;
    const { commentId } = req.body;

    const isCommentInComments = await Comments.findOne({ _id: commentId });

    // 댓글 작성자가 맞다면
    if (res.locals.user.nickname != isCommentInComments.userName) {
        res.send({ errorMessage: "Access denied" });

        return
    }

    if (isCommentInComments) {
        await Comments.deleteOne({ _id: commentId });
    }

    res.send({ })
});

module.exports = router;