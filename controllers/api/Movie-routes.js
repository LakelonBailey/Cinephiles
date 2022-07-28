var router = require('express').Router();
const { Movie } = require('../../models/Movie');

//get a movie from the list
router.get("https://imdb-api.com/en/API/SearchMovie/k_12345678/:id", function (req, res) {
    res.send('List of movies.');
});

//post movie to watchlist
router.post('/', function (req, res) {
    data = req.body
    console.log(data)
    res.json(data)
});

//delete movie from watchlist
router.delete('/movie', function (req, res) {
    res.send('Deleted from watch list.')
});

/*TESTTEST*/


module.exports = router;
