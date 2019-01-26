// phase router. THIS IS FOR MAIN PHASE!
module.exports = function(app, string, Phase, Util){//함수로 만들어 객체 app을 전달받음
	var express = require('express');
	var router = express.Router();
    
    // GET sub stream, each found with id
	router.get('/sub_stream/:phase_id', function(req, res) {
		Phase.findOne({id: req.params.phase_id}, function(err, phase) {
            if (err) {
                return res.status(500).send({error: 'database failure'});
            } else {
                console.log('GET /game/phase/sub_stream ' + req.params.phase_id);
                res.json(phase.sub_stream);
            }
        });
	});
    
    // Update sub stream
    router.put('/sub_stream/:phase_id', function(req, res) {
       Phase.findOne({id: req.params.phase_id}, function(err, phase) {
          if (err) {
              return res.status(500).send({error: 'database failure'});
          } else {
              console.log('PUT /game/phase/sub_stream ' + req.params.phase_id);
              phase.sub_stream = req.body.sub_stream;
              
              phase.save(function(err) {
                  if (err) {
                      res.status(500).json({error: 'failed to update'});
                  } else {
                      res.json({message: 'sub stream updated'});
                  }                      
              });
          }
       });
    });

    // user had chosen one card!
	router.put('/play/:phase_id/:player_id/:card_id', function(req, res) {
        // TODO: 만약 모든 턴이 끝난 경우 계싼 후 새 페이즈 생성
        // TODO: 무조건 해당 카드를 플레이어 덱에서 제외시켜야 함.
        // TODO: 해당 카드를 페이즈의 플레이어 카드에 넣는다. 순서는 2 - 3 - 1이어야 함.
        Util.delete_card_of_player(req.params.player_id, req.params.card_id, function(err, card_id) {
            if (err) {
                return res.status(500).send({error: 'database error'});
            } else {
                Phase.findOne({id: req.params.phase_id}, function(err, phase) {
                    phase.cards[req.params.player_id] = card_id;
                    
                    if (phase.cards.length === 5) {
                        // make new phase
                        // set new phase id to game!
                        
                        // TODO: calculate the winner & card values, put it to won_card of the player.
                        // THEN generate a phase with winner player's id
                        // THEN change game's phase id
                    }
                    
                    if (phase.cards.length === 0) {
                        // change phase's sub_stream to card's sub stream!
                        // 1. Get card's sub_stream value
                        Util.get_suit(card_id, function(err, suit) {
                            if (err) {
                                res.status(500).send({error: 'database error'});
                            } else {
                                phase.sub_stream = suit;
                                phase.save(function(err) {
                                    if (err) {
                                        res.status(500).send({error: 'database saving error'});
                                    } else {
                                        res.json({message: 'Card is uploaded'});
                                    }
                                })
                            }
                        });
                        // 2. sSet phase sub stream value
                    }
                });
            }
        });
        
	});
    
	return router;	//라우터를 리턴
};