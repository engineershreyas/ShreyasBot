var express = require('express');
var bodyParser = require('body-parser');


var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use( bodyParser.json());

app.get('/', function(req,res){
	res.send("hello, world!");
    });

app.listen(port, function() {
	
	console.log("listening");

    });