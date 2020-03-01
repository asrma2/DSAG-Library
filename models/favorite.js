const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    books:[{type: mongoose.Schema.Types.ObjectId,
                ref: 'Book'}]
}, {
    timestamps: true
});

var Favorites = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorites;