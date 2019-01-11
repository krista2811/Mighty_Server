var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
    player_id : Number,
    job : Number,
    hand : Object,
    won_card : Object
});

module.exports = mongoose.model('player', playerSchema);