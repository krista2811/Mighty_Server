// app.js

// [LOAD PACKAGES]
var express     = require('express');
var app         = express();

var string      = require('./public/js/string');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 50691;


/*
[CONFIGURE MODELS]
*/
var Book = require('./models/book');
var Card = require('./models/card');
var Game = require('./models/game');
var Phase = require('./models/phase');


/*
[CONFIGURE ROUTER]
*/

// game router
var game = require('./routes/game/main.js')(app, string, Game);
app.use('/game', game);

// phase router
var phase = require('./routes/game/phase.js')(app, string, Game, Phase);
app.use('/game/phase', phase);

app.use(express.static('public'));

// [ CONFIGURE mongoose ]

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect(string.database, {useNewUrlParser: true});

// [RUN SERVER]
var server = app.listen(port, function(){
    console.log("Express server has started on port " + port);
});
