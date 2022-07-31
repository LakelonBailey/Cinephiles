const withAuth = require('../utils/auth');

const router = require('express').Router();

router.get('/', withAuth, (req, res) => {
    res.render('search', {
        loggedIn: req.session.loggedIn
    });
})

router.get('/api-key/', (req, res) => {
    res.json({
        'api_key': process.env.IMDB_API_KEY
    });
})

module.exports = router