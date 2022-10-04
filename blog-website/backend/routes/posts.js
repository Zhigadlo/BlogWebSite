const router = require('express').Router();
let Post = require('../models/post.model');
router.route('/').get((req, res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const author = req.body.author;
    const likes = req.body.likes;
    const comments = req.body.comments;
    const date = req.body.date;

    const newPost = new Post({
            title,
            body,
            author,
            likes,
            comments,
            date
    });

    newPost.save()
        .then(() => res.json('Post added!'))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/:id').get((req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json('Error ' + err));
})

router.route('/:id').delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post deleted.'))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/update/:id').post((req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            post.title = req.body.title;
            post.body = req.body.body;
            post.author = req.body.author;
            post.date = req.body.date;
            post.comments = req.body.comments;
            post.likes = req.body.likes;

            post.save()
                .then(() => res.json('Post updated.'))
                .catch(err => res.status(400).json('Error ' + err));
        })
        .catch(err => res.status(400).json('Error ' + err));
})

module.exports = router;