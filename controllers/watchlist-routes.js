const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('watchlist')
})

module.exports = router