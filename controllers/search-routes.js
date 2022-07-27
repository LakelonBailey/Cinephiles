const withAuth = require('../utils/auth');

const router = require('express').Router();

router.get('/', withAuth, (req, res) => {
    res.render('search', {
        loggedIn: req.session.loggedIn
    });
})

module.exports = router