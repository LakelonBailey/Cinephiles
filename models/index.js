// import the models
const User = require('./User');
const Movie = require('./Movie');
const Watchlist = require('./Watchlist');
const Review = require('./Review');


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

Review.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});
  
Review.belongsTo(Movie, {
foreignKey: 'movie_id',
onDelete: 'SET NULL'
});

User.hasMany(Review, {
foreignKey: 'user_id',
onDelete: 'SET NULL'
});

Movie.hasMany(Review, {
foreignKey: 'movie_id'
});




module.exports = { User, Movie, Watchlist, Review };


