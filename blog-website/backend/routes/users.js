const router = require('express').Router();
let User = require('../models/user.model');
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.nickname;
    const lastName = req.body.lastName;
    const nickname = req.body.nickname;

    const newUser = new User({
            name,
            lastName,
            nickname
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;