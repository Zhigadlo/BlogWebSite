const mongoose = require('mongoose');
const { userInfo } = require('os');
const Schema = mongoose.Schema;

const blogShceme = new Schema({
    title: String,
    body: String,
    author: String
});

// подключение
var connectionString = "mongodb+srv://Zhigadlo:3VQhXcNw1HPh2mJi@amazoncloud.mismmy6.mongodb.net/blogsdb?retryWrites=true&w=majority";
mongoose.connect(connectionString);

const Blog = mongoose.model("Blog", blogShceme);

const blog = new Blog({
    title: "Test blog title",
    body: "Test text of blog",
    author: "Vladislav Zhogol"
});

blog.save(function(err, createdBlog) {
    mongoose.disconnect();
    if (err) return console.log(err);
  
    console.log("Сохранен объект", createdBlog);
  });