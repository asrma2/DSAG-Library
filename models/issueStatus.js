const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

var Issues = mongoose.model('Issue', issueSchema);

module.exports = Issues;