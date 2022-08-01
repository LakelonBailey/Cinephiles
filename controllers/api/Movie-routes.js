const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Movie, Watchlist } = require('../../models')


// Adds a movie to User's watchlist
router.post('/', (req, res) => {
    const data = req.body;
    const imdbId = data.imdb_id
    const userId = req.session.user_id
// if the movie already exists in the database, it will add that movie to the user's watchlist.
    Movie.findOne({
        where: {
            imdb_id: imdbId
        }
    }).then(dbMovieData => {
        if (dbMovieData) {
            // checks to see if the user already has the movie in their database
           Watchlist.findOne({
               where: {
                   user_id: userId,
                   movie_id: dbMovieData.id
               }
           }).then(dbWatchlistData => {
               if (dbWatchlistData) {
                  res.status(404).json({
                      message: 'You already have this movie added to your Watchlist.',
                      type: 'is-danger'
                  }) 
               }
               else {
                   // creates the watchlist link between the user and the movie in the database
                Watchlist.create(
                    {
                        user_id: userId,
                        movie_id: dbMovieData.id
                    }
                ).then(dbWatchlistData => {
                    res.status(200).json({
                        message: dbMovieData.title + ' has been added to your Watchlist!',
                        type: 'is-success'
                    })
                })
               }
           })
           
        }
        else {
            // adds the movie to the database then creates an association between that user and the movie
            Movie.create(data).then(dbMovieData => {
                Watchlist.create({
                    user_id: userId,
                    movie_id: dbMovieData.id
                }).then(dbWatchlistData => {
                    res.status(200).json({
                        message: dbMovieData.title + ' has been added to your Watchlist!',
                        type: 'is-success'
                    })
                })

            })
        }
    })
});

//delete movie from watchlist
router.delete('/:id', (req, res) => {
    Watchlist.destroy({
        where: {
            movie_id: req.params.id,

            user_id: req.session.user_id
        },
    }).then(dbWatchlistData => {
        Movie.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'imdb_id',
                'title',
                'image',
                [sequelize.literal('(SELECT COUNT(*) FROM watchlist WHERE movie.id = watchlist.movie_id)'), 'watchlist_count']
              ]
        }).then(dbMovieData => {
            let movieData = dbMovieData.get({
                plain: true
            })
            let movieTitle = dbMovieData.title
            // destroys the movie's presence in the database if no users have the movie on their watchlist
            if (movieData.watchlist_count == 0) {
                Movie.destroy({
                    where: {
                        id: movieData.id
                    }
                }).then(dbMovieData => {
                    res.status(200).json({
                        message: movieTitle + ' was successfuly removed from Watchlist!',
                        type: 'is-success'
                    })
                })
            }
            else {
                res.status(200).json({
                    message: movieTitle + ' was successfuly removed from Watchlist!',
                    type: 'is-success'
                })
            }
        })
    })
});


module.exports = router;

