const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default:false      
    }
}, {
    timestamps: true
});

var Books = mongoose.model('Book', bookSchema);

module.exports = Books;