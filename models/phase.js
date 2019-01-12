var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var phaseSchema = new Schema({
    id: Number,
    cards : [],
    turn : Number,
    sub_stream : Number // enum balue
});

module.exports = mongoose.model('phase', phaseSchema);