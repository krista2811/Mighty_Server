// index.js

var Log = require('../../public/js/log.js')("Util");
var ArrayUtil = require('../../public/js/util.js');

function Util(string, Game, Player, Phase, Card){
    return {
        get_game: function() {
            return Game;
        },
        
        get_card: function() {
            return Card;
        },
        
        get_phase: function() {
            return Phase;
        },
        
        get_player: function() {
            return Player;
        },
        
        get_phase_data: function(phase_id, callback) {
            get_phase_data(Phase, phase_id, callback);
        },
        
        get_suit: function(card_id, callback) {
            get_suit(Card, card_id, callback);
        },
        
        get_player_by_id: function(player_id, callback) {
            get_player_by_id(Player, player_id, callback);
        },
        
        delete_card_of_player: function(player_id, card_id, callback) {
            delete_card_of_player(Player, player_id, card_id, callback);
        },
        
        update_phase_id: function(phase_id, callback) {
            update_phase_id(Game, phase_id, callback);
        }
    };
}

function get_player_by_id(Player, player_id, callback) {
    Player.findOne({id: player_id}, function(err, player) {
       if (err) {
           log.err("Error logged in Util");
           callback(true, null);
       } else {
           callback(false, player);
       }
    });
}

function generate_new_phase(Game, string, phase_id, player_id, callback) {
    var phase = new Phase();
    // TODO: make new phase, and return the phase id!!!!!!!!!!!!
    phase.id = phase_id;
    phase.turn = player_id;
    phase.cards = [];
    phase.sub_stream = string.phase.NONE;
    
    
}

function get_suit(Card, card_id, callback) {
    Card.findone({id: card_id}, function(err, card) {
        if (err) {
            callback(true, null);
        } else {
            callback(false, card.suit);
        }
    });
}

function update_phase_id(Game, phase_id, callback) {
    Game.findOne({id: 0}, function(err, game) {
        game.phase_id = phase_id;
        game.save(function(err) {
            if (err) {
                log.err("Error in Database saving Util");
                callback(true, game);
            } else {
                callback(false, game);
            }
            
        });
    });
}

function get_phase_data(Phase, phase_id, callback) {
    Phase.findOne({id: phase_id}, function(err, phase) {
        if (err) {
            log.err("Error in Database fetching Phase");
            callback(true, phase);
        } else {
            callback(false, phase);
        }
    });
}

function delete_card_of_player(Player, player_id, card_id, callback) {
    get_player_by_id(Player, player_id, function(err, player) {
        if (err) {
            log.err("Error logged in Util");
            callback(true, null);
        } else {
            ArrayUtil.remove(player.hand, card_id);
            player.save(function(err) {
                if (err) {
                    log.err("Error in saving player");
                    callback(true, card_id);
                } else {
                    log.log("delete 200", "save success");
                    callback(false, card_id);
                }
            });
        }
    });
}

// TODO: make new function changing phase id!

module.exports = Util;