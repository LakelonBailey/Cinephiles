const router = require('express').Router();
const sequelize = require('../config/connection');
const { Movie, Review, User } = require('../models')


// renders the homepage with all movies in the database, ranking them based on their watchlist count
router.get('/', (req, res) => {
  Movie.findAll({
    attributes: [
      'id',
      'imdb_id',
      'title',
      'image',
      [sequelize.literal('(SELECT COUNT(*) FROM watchlist WHERE movie.id = watchlist.movie_id)'), 'watchlist_count'],
      [sequelize.literal('(SELECT COUNT(*) FROM review WHERE movie.id = review.movie_id)'), 'review_count']
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

// renders a page showing further information about a single movie
router.get('/reviews/:id', (req, res) => {
  Movie.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Review,
        include: [
          {
            model: User,
            attributes: ['id', 'username']
          }
        ]
      }
    ]
  }).then(dbMovieData => {
    const movie = dbMovieData.get({
      plain: true
    })
    let ratingSum = 0
    movie.reviews.forEach(review => {
      ratingSum += review.rating
      review.rating_arr = []
      // creates an iterable that allows the template to render starts for each rating point
      for (let i = 0; i<review.rating; i++) {
        review.rating_arr.push(0)
      }
      if (review.user_id == req.session.user_id) {
        review.can_delete = true
      }
      else {
        review.can_delete = false
      }
    })
    if (movie.reviews.length) {
      movie.average_rating = ratingSum / movie.reviews.length
    }
    res.render('single-movie', {
      movie: movie,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id
    })
  })
})

// deletes a review by its id
router.delete('/reviews/:id', (req, res) => {
  Review.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbReviewData => {
    res.json(dbReviewData)
  })
})

// adds a new review
router.post('/reviews/', (req, res) => {
  Review.create({
    user_id: req.session.user_id,
    movie_id: req.body.movie_id,
    rating: req.body.rating,
    review_text: req.body.review_text
  })
  .then(dbReviewData => {
    console.log(dbReviewData)
    res.json(dbReviewData)
  })
})

// renders the login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

module.exports = router