const withAuth = require('../utils/auth');

const router = require('express').Router();

// renders the search page
router.get('/', withAuth, (req, res) => {
    res.render('search', {
        loggedIn: req.session.loggedIn
    });
})


// retrieves the imdb api key
router.get('/api-key/', (req, res) => {
    res.json({
        'api_key': process.env.IMDB_API_KEY
    });
})

module.exports = router