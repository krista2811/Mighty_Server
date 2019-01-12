// app.js

// [LOAD PACKAGES]
var express     = require('express');
var app         = express();

var string      = require('./public/js/string');
console.log(string.suit);
var mongoose    = require('mongoose');

var Player = require('./models/player');
var Game = require('./models/game');

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect(string.database, {useNewUrlParser: true});

set_game_data(function() {
    console.log("Dummy Data All set!");
});

function set_one_player(id, job, hand, won_card, callback) {
    var player = new Player();

    // set default player. Now each job is Lord, Friend, YA, Ya, YA
    player.player_id = id;
    player.job = job;
    player.hand = hand;
    player.won_card = [];

    // save card in database
    player.save(function(err) {
        if (err) {
            console.error(err);
            return;
        } else {
            callback();
        }
    });
}

// functions which SHOULD BE ON ROUTER AFTER DUMMY

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array, callback) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    
    callback();
}

function spreadHands(hand1, hand2, hand3, hand4, hand5, all_card_indices, callback) {
    for (var i = 0; i < 10; i++) {
        hand1[i] = all_card_indices[i];
        hand2[i] = all_card_indices[i + 10];
        hand3[i] = all_card_indices[i + 20];
        hand4[i] = all_card_indices[i + 30];
        hand5[i] = all_card_indices[i + 40];
    }
    
    callback();
}

function set_game(all_card_indices, callback) {
    var game = new Game();
    game.cards = all_card_indices;
    game.players = [0, 1, 2, 3, 4];
    game.commit = 14;
    game.is_over = false;
    game.main_stream = string.suit.SPADE;
    game.phase = string.phase.ON_GAME;
    
    game.save(function(err) {
        if (err) {
            console.error(err);
            return;
        } else {
            callback();
        }
    });
}

function set_game_data(callback) {
    var card_indices = [];
    
    for (var i = 0; i < 53; i++) {
        card_indices.push(i);
    }
    
    var hand1 = [0,0,0,0,0,0,0,0,0,0];
    var hand2 = [0,0,0,0,0,0,0,0,0,0];
    var hand3 = [0,0,0,0,0,0,0,0,0,0];
    var hand4 = [0,0,0,0,0,0,0,0,0,0];
    var hand5 = [0,0,0,0,0,0,0,0,0,0];
    shuffleArray(card_indices, function(){
        spreadHands(hand1, hand2, hand3, hand4, hand5, card_indices, function() {
            set_one_player(0, string.player_job.LORD, hand1, [], function() {
                set_one_player(1, string.player_job.FRIEND, hand2, [], function() {
                    set_one_player(2, string.player_job.YA, hand3, [], function() {
                        set_one_player(3, string.player_job.YA, hand4, [], function() {
                            set_one_player(4, string.player_job.YA, hand5, [], function() {
                                console.log("SET ALL PLAYER!");

                                // set game!
                                set_game(card_indices.slice(50, 53), function() {
                                    console.log("SET GAME!");
                                });
                            });
                        });
                    });
                });
            });
        });
    });
    
}