var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cardSchema = new Schema({
    id : Number,
    suit : Number,
    rank : Number,
    job : Number
});

module.exports = mongoose.model('card', cardSchema);