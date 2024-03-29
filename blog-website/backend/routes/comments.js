const router = require('express').Router();
let Comment = require('../models/comment.model');
router.route('/').get((req, res) => {
    Comment.find()
        .then(comments => res.json(comments))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const text = req.body.text;
    const likes = parseInt(req.body.likes);
    const authorId = req.body.authorId;
    const date = Date.parse(req.body.date);
    
    const newComment = new Comment({
            text,
            likes,
            authorId,
            date
    });

    newComment.save()
        .then(comment => res.json(comment))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Comment.findById(req.params.id)
        .then(comment => res.json(comment))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
    Comment.findByIdAndDelete(req.params.id)
        .then(() => res.json('Comment deleted.'))
        .catch(err => res.status(400).json('Error ' + err));
})

router.route('/update/:id').post((req, res) => {
    Comment.findById(req.params.id)
        .then(comment => {
            comment.text = req.body.text;
            comment.authorId = req.body.author;
            comment.date = Date.parse(req.body.date);
            comment.likes = parseInt(req.body.likes);

            comment.save()
                .then(() => res.json('Comment updated.'))
                .catch(err => res.status(400).json('Error ' + err))
        })
        .catch(err => res.status(400).json('Error ' + err));
})

module.exports = router;