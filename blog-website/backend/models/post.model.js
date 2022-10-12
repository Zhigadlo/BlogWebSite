const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    authorId: { type: String, required: true },
    likes: { type: Number, required: true },
    commentIds: { type: Array, required: true }, // array of comments
    date: { type: Date, required: true }
}, {versionKey: false});

const Post = mongoose.model('Post', postSchema)

module.exports = Post;