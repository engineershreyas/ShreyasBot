var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var request = require('request');
var analysis = require("./modules/analysis");
var operations = require("./modules/operations");


var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use( bodyParser.json());

var token = 'CAAMO2Q6yOFgBAG2io6VBdbplg8cCmF5ZC2rydqNACYmBZCIKKa8JZAmHVPISsCXSKhWrLMdHNMRWdUEZC7h5HEGtkEPKcuVe7rPuFyWwlwhOrSdZAGMegSh6dyW7G3h4sY5Ptfr8y762QFXp08pQOOfiFCIXcWLvB0NvWFSH416ZAPJqv7hUmIO5b8mhrZBDurxkaKZBONRQCQZDZD';

app.get('/',function(req, res) {

		res.send('Hello world, I am a chat bot');

});

app.get('/webhook/', function(req,res){
	if(req.query['hub.verify_token'] === 'CAAMO2Q6yOFgBAG2io6VBdbplg8cCmF5ZC2rydqNACYmBZCIKKa8JZAmHVPISsCXSKhWrLMdHNMRWdUEZC7h5HEGtkEPKcuVe7rPuFyWwlwhOrSdZAGMegSh6dyW7G3h4sY5Ptfr8y762QFXp08pQOOfiFCIXcWLvB0NvWFSH416ZAPJqv7hUmIO5b8mhrZBDurxkaKZBONRQCQZDZD'){

	    res.send(req.query['hub.challenge']);

	}else{

		res.send('Error, wrong validation token');

	}
});

app.post('/webhook/', function(req,res){

	console.log("message received\n");

	messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        if (event.message && event.message.text) {
            text = event.message.text
            operations(sender, analysis(text))
        }
    }
    res.sendStatus(200)


});










app.listen(port, function() {

	console.log("listening");

});
