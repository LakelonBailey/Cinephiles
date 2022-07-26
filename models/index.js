// import the models
const User = require('./User');
const Movie = require('./Movie');
const Watchlist = require('./Watchlist'); 


// create associations 
User.hasMany(Movie, {
    foreignKey: 'user_id'
});

Movie.belongsTo(User, {
    foreignKey: 'user_id', 
    onDelete: 'SET NULL'
});

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

Watchlist.belongsTo(User, {
    foreignKey: 'user_id', 
    onDelete: 'SET NULL'
});

Watchlist.hasMany(Movie, {
   foreignKey: 'watchlist_id' 
});

User.hasOne(Watchlist, {
    foreignKey: 'user_id'
});





module.exports = { User, Movie, Watchlist };


