const router = require('express').Router();

const apiRoutes = require('./api');
const homepageRoutes = require('./homepage-routes.js');
const searchRoutes = require('./search-routes.js');
const watchlistRoutes = require('./watchlist-routes.js')

router.use('/', homepageRoutes);
router.use('/search', searchRoutes);
router.use('/api', apiRoutes);
router.use('/watchlist', watchlistRoutes);

module.exports = router;