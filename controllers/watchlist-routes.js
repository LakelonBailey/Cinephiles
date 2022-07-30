const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { User, Movie, Watchlist, Review } = require('../models')
const movieAttr = ['id', 'imdb_id', 'title', 'image']
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