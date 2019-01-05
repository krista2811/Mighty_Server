// app.js

// [LOAD PACKAGES]
var express     = require('express');
var app         = express();

var string      = require('./public/js/string');
console.log(string.suit);
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 50691;

var Book = require('./models/book');
var Card = require('./models/card');

// [CONFIGURE ROUTER]
var router = require('./routes')(app, Book);

app.use(express.static('public'));

// [ CONFIGURE mongoose ]

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});
mongoose.connect('mongodb://localhost/mongodb_tutorial');

// [RUN SERVER]
var server = app.listen(port, function(){
    console.log("Express server has started on port " + port);
    setup_database(string.database, function(){
        console.log("Database set");
    });
});

function setup_database(database_name, callback) {
    var card = new Card();
    card.id = 0;
    card.rank = 3;
    card.suit = string.suit.SPADE;
    card.job = string.job.NONE;
    
    card.save(function(err){
        if(err){
            console.error(err);
            return;
        }

    });
    callback();
}