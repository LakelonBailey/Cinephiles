// import the models
const User = require('./User');
const Movie = require('./Movie');
const Watchlist = require('./Watchlist'); 


// create associations 
User.belongsToMany(Movie, {
    through: Watchlist, 
    as: 'watchlisted_movies', 
    foreignKey: 'user_id', 
    onDelete: 'SET NULL'
});

Movie.belongsToMany(User, {
    through: Watchlist, 
    as: 'watchlisted_movies', 
    foreignKey: 'movie_id', 
    onDelete: 'SET NULL'
});





module.exports = { User, Movie, Watchlist };


