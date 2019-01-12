// phase router. THIS IS FOR MAIN PHASE!
module.exports = function(app, string, Game, Phase){//함수로 만들어 객체 app을 전달받음
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

	router.get('/r2', function(req, res) {
		res.send('Hello /p1/r2');		
	});
    
	return router;	//라우터를 리턴
};