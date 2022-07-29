const router = require('express').Router();
const sequelize = require('../config/connection');
const { Movie } = require('../models')

router.get('/', (req, res) => {
  Movie.findAll({
    attributes: [
      'id',
      'imdb_id',
      'title',
      'image',
      [sequelize.literal('(SELECT COUNT(*) FROM watchlist WHERE movie.id = watchlist.movie_id)'), 'watchlist_count']
    ],
    order: [
      [sequelize.literal('watchlist_count'), 'DESC']
    ]
  }).then(dbMovieData => {
    const movies = dbMovieData.map(movie => movie.get({
      plain: true
    }))

    res.render('homepage', {
      loggedIn: req.session.loggedIn,
      movies: movies
    })
  })
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

module.exports = router