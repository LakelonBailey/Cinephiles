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
    let movies = dbMovieData.map(movie => movie.get({
      plain: true
    }))
    let moviesToDelete = []
    let moviesToShow = []
    for (let movie of movies) {
      if (movie.watchlist_count == 0) {
        moviesToDelete.push(movie.id)
      }
      else {
        moviesToShow.push(movie)
      }
    }

    if (!moviesToDelete.length == 0) {
      Movie.destroy({
        where: {
          id: moviesToDelete
        }
      }).then(dbMovieData => {
        console.log(dbMovieData)
      })
    }
    res.render('homepage', {
      loggedIn: req.session.loggedIn,
      movies: moviesToShow
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