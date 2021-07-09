const mongoose = require('mongoose');

const { Schema } = mongoose;
const CommentSchema = new Schema({
    postId: Number,
    userName: String,
    date: String,
    comment: String,
});

CommentSchema.virtual('commentId').get(function() {
    return this._id.toHexString();
})

CommentSchema.set("toJSON", {
    virtuals: true,
})

module.exports = mongoose.model("Comments", CommentSchema);