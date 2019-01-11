// app.js

// [LOAD PACKAGES]
var express     = require('express');
var app         = express();

var string      = require('./public/js/string');
console.log(string.suit);
var mongoose    = require('mongoose');

var Card = require('./models/card');

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect(string.database, {useNewUrlParser: true});

setup_database(function() {
    console.log("Database all set");
});

function setup_database(callback) {
    set_one_suit(0, 1, string.suit.SPADE, set_one_suit);
    set_one_suit(13, 1, string.suit.DIAMOND, set_one_suit);
    set_one_suit(26, 1, string.suit.HEART, set_one_suit);
    set_one_suit(39, 1, string.suit.CLOVER, set_one_suit);
    
    var joker = new Card();
    joker.id = 53;
    joker.rank = -1;
    joker.suti = string.suit.NONE;
    joker.job = string.job.JOKER;
    
    joker.save(function(err) {
        if (err) {
            console.error(err);
            return;
        } else {
            callback();
        }
    });
}

function set_one_suit(id, rank, suit, callback) {
    if (rank == 14) {
        console.log("Set one suit");
    } else {
        var card = new Card();
        // set default cards
        card.id = id;
        card.rank = rank;
        card.suit = suit;
        card.job = string.job.NONE;
        
        // set special cards
        if (rank == 3 && suit == string.suit.CLOVER) {
            card.job = string.job.JOKER_CALL;
        } else if (rank == 1 && suit == string.suit.SPADE) {
            card.job = string.job.MIGHTY;
        }
        
        // save card in database
        card.save(function(err) {
            if (err) {
                console.error(err);
                return;
            } else {
                callback(id + 1, rank + 1, suit, callback);
            }
        });
        
    }
}