/*
- posts Schema

postId: Number
title: String
name: String
password: String
Date: Date
post: String
*/

const mongoose = require('mongoose');

const { Schema } = mongoose;
const postsSchema = new Schema({
    postId: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Posts", postsSchema);