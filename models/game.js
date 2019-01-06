var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
    cards : Arrays, // might change. It needs to pop, so mabe stack?,
    players : Arrays,
    commit : Number,
    is_over : Boolean,
    main_stream : Number, // enum value
    phase : Number
});

module.exports = mongoose.model('game', gameSchema);