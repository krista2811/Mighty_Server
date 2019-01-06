var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var phaseSchema = new Schema({
    cards : Arrays,
    turn : Number,
    sub_stream : Number // enum balue
});

module.exports = mongoose.model('phase', phaseSchema);