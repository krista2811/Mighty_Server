var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    user_id : String,
    user_pw : String,
    win_rate : Number,
    id : Number
});

module.exports = mongoose.model('user', userSchema);