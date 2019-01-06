var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
    player_id : Number,
    job : Number,
    hand : Arrays,
    won_card : Arrays
});

module.exports = mongoose.model('player', playerSchema);