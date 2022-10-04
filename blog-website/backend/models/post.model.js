const mongoose = require('mongoose');
const User = require('./user.model');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: User, required: true },
    likes: { type: Number, required: true },
    comments: { type: Array, required: true }, // array of comments
    date: { type: Date, required: true }
}, {versionKey: false});

const Post = mongoose.model('Post', postSchema)

module.exports = Post;