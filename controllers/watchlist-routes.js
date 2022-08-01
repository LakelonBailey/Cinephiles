const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Movie, Watchlist, Review } = require('../models')

// renders a user's watchlist
router.get('/', withAuth, (req, res) => {
    User.findOne({
        where: {
            id: req.session.user_id
        },
        include: [
            {
                model: Movie,
                attributes: [
                    'id',
                    'imdb_id',
                    'title',
                    'image',
                ],
                include: [
                    {
                        model: Review
                    }
                ],
                through: Watchlist,
                as: 'watchlisted_movies'
              }
        ]
    }).then(data => {
        const userData = data.get({
            plain: true
        })
        res.render('watchlist',{
            data: userData,
            loggedIn: req.session.loggedIn
        })
    })
})

module.exports = router