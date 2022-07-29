var router = require('express').Router();
const { Movie, Watchlist } = require('../../models')


//post movie to watchlist
router.post('/', (req, res) => {
    const data = req.body;
    const imdbId = data.imdb_id
    const userId = req.session.user_id

    Movie.findOne({
        where: {
            imdb_id: imdbId
        }
    }).then(dbMovieData => {
        if (dbMovieData) {
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
        }
    }).then(dbWatchlistData => {
        Movie.findOne({
            where: {
                id: req.params.id
            }
        }).then(dbMovieData => {
            res.status(200).json({
                message: dbMovieData.title + ' was successfuly removed from Watchlist!',

                type: 'is-success'
            })
        })
    })
});


module.exports = router;

