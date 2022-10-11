const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const uri = "mongodb+srv://Zhigadlo:3VQhXcNw1HPh2mJi@amazoncloud.mismmy6.mongodb.net/blogsdb?retryWrites=true&w=majority";
//const uri = process.env.ATLAS_URI;

console.log(uri)
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDb database connection established succesfully");
});

const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');
const postsRouter = require('./routes/posts');

app.use('/users', usersRouter);
app.use('/comments', commentsRouter);
app.use('/posts', postsRouter);

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
})
