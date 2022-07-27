const router = require('express').Router();

const userRoutes = require('./User-routes.js');
const movieRoutes = require('./Movie-routes.js');
const imdbRoutes = require('./imdb-api-routes');

router.use('/users', userRoutes);
router.use('/movie', movieRoutes);
router.use('/imdb', imdbRoutes);

module.exports = router;
