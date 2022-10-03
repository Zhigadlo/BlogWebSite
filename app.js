const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    lastName: String,
    nickname: String
})

const commentSchema = new Schema({
    text: String,
    likes: Number,
    author: userSchema
})

const postScheme = new Schema({
    title: String,
    body: String,
    author: userSchema,
    likes: Number,
    comments: Array
}, {versionKey: false});

// подключение
var connectionString = "mongodb+srv://Zhigadlo:3VQhXcNw1HPh2mJi@amazoncloud.mismmy6.mongodb.net/blogsdb?retryWrites=true&w=majority";
mongoose.connect(connectionString);

const Post = mongoose.model("Post", postScheme);
const Comment = mongoose.model("Comment", commentSchema)
const User = mongoose.model("User", userSchema)

const me = new User({
    name: "Vladislav",
    lastName: "Zhogol",
    nickname: "Zhigadlo"
})

const author1 = new User({
    name: "Sanya",
    lastName: "Vishyak",
    nickname: "Sushnyak"
})

const author2 = new User({
    name: "Vanya",
    lastName: "Andreevec",
    nickname: "IvanGrozniy"
})

const comment1 = new Comment({
    text: "Shit post",
    likes: 3,
    author: author1
})

const comment2 = new Comment({
    text: "Useful information",
    likes: 5,
    author: author2
})

const post = new Post({
    title: "Test blog title",
    body: "Test text of blog",
    author: me,
    likes: 10,
    comments: [comment1, comment2]
});

Post.find({name: post.name}, function(err, docs){
    if(err) return console.log(err)

    if(docs.length > 0){
        console.log("Database have such blog")
    }
    else{
        post.save(function(err, createdBlog){
            console.log("Сохранен объект", createdBlog)
        })
    }
    mongoose.disconnect()
})