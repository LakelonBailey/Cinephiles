const router = require('express').Router();

const userRoutes = require('./User-routes');
const movieRoutes = require('./Movie-routes');
const imdbRoutes = require('./imdb-api-routes.ks');

router.use('/users', userRoutes);
router.use('/movie', movieRoutes);
router.use('/imdb', imdbRoutes);

module.exports = router;
