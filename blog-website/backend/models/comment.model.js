const mongoose = require('mongoose');
const User = require('./user.model');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: { type: String, required: true},
    likes: { type: Number, required: true },
    author: { type: User, required: true }
}, {versionKey: false})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment;