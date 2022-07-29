const router = require('express').Router();

const userRoutes = require('./User-routes.js');
const movieRoutes = require('./Movie-routes.js');

router.use('/users', userRoutes);
router.use('/movie', movieRoutes);

module.exports = router;
