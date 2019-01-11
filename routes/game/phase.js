// phase router. THIS IS FOR MAIN PHASE!
module.exports = function(app){//함수로 만들어 객체 app을 전달받음
	var express = require('express');
	var router = express.Router();
    
	router.get('/get_main_stream', function(req, res){
		res.send('dummy stream!');		
	});

	router.get('/r2', function(req, res){
		res.send('Hello /p1/r2');		
	});
	return router;	//라우터를 리턴
};