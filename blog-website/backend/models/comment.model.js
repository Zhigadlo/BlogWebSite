const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: { type: String, required: true},
    likes: { type: Number, required: true },
    author: { type: String, required: true },
    date: { type: Date, required: true }
}, {versionKey: false})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment;