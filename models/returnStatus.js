const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const returnSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    user: {
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

var Returns = mongoose.model('Return', returnSchema);

module.exports = Returns;