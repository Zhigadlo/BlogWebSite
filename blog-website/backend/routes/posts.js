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
    const authorId = req.body.authorId;
    const likes = parseInt(req.body.likes);
    const commentIds = req.body.commentIds;
    const date = Date.parse(req.body.date);

    const newPost = new Post({
            title,
            body,
            authorId,
            likes,
            commentIds,
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
            post.authorId = req.body.author;
            post.date = Date.parse(req.body.date);
            post.commentIds = req.body.commentIds;
            post.likes = parseInt(req.body.likes);

            post.save()
                .then(() => res.json('Post updated.'))
                .catch(err => res.status(400).json('Error ' + err));
        })
        .catch(err => res.status(400).json('Error ' + err));
})

module.exports = router;