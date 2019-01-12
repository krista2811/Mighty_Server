// game/main router. THIS IS FOR MAIN PHASE!
module.exports = function(app, string, Game){//함수로 만들어 객체 app을 전달받음
	var express = require('express');
	var router = express.Router();

    // get current main stream
    router.get('/main_stream', function(req, res){
		Game.findOne(function(err, game) {
            if (err) {
                return res.status(500).send({error: 'database failure'});
            } else {
                console.log('GET /game/get_main_stream');
                res.json(game.main_stream);
            }
        });
	});
    
    // get current game phase
	router.get('/phase', function(req, res) {
		Game.findOne(function(err, game) {
            if (err) {
                return res.status(500).send({error: 'database failure'});
            } else {
                console.log('GET /game/get_phase');
                res.json(game.phase);
            }
        });
	});
    
    //update phase
    router.put('/phase/', function(req, res) {
       Game.findOne(function(err, game) {
          if (err) {
              return res.status(500).send({error: 'database failure'});
          } else {
              var current_phase = game.phase;
              if (game.phase == string.phase.ON_GAME) {
                  game.phase = string.phase.ELECTION;
              } else {
                  game.phase = current_phase + 1;
              }
              
              game.save(function(err) {
                  if (err) {
                      res.status(500).json({error: 'failed to update'});
                  } else {
                      res.json({message: 'phase updated'});
                  }
              });
          }
       }); 
    });
    
	return router;	//라우터를 리턴
};