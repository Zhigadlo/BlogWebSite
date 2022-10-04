const router = require('express').Router();
let Comment = require('../models/comment.model');
router.route('/').get((req, res) => {
    Comment.find()
        .then(comments => res.json(comments))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const text = req.body.text;
    const likes = req.body.likes;
    const author = req.body.author;
    const date = req.body.date;
    
    const newPost = new Post({
            title,
            likes,
            author,
            date
    });

    newPost.save()
        .then(() => res.json('Comment added!'))
        .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;