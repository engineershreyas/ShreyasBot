var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var request = require('request')

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use( bodyParser.json());

var token = 'CAAMO2Q6yOFgBAG2io6VBdbplg8cCmF5ZC2rydqNACYmBZCIKKa8JZAmHVPISsCXSKhWrLMdHNMRWdUEZC7h5HEGtkEPKcuVe7rPuFyWwlwhOrSdZAGMegSh6dyW7G3h4sY5Ptfr8y762QFXp08pQOOfiFCIXcWLvB0NvWFSH416ZAPJqv7hUmIO5b8mhrZBDurxkaKZBONRQCQZDZD';

app.get('/webhook/', function(req,res){
	if(req.query['hub.verify_token'] === 'CAAMO2Q6yOFgBAG2io6VBdbplg8cCmF5ZC2rydqNACYmBZCIKKa8JZAmHVPISsCXSKhWrLMdHNMRWdUEZC7h5HEGtkEPKcuVe7rPuFyWwlwhOrSdZAGMegSh6dyW7G3h4sY5Ptfr8y762QFXp08pQOOfiFCIXcWLvB0NvWFSH416ZAPJqv7hUmIO5b8mhrZBDurxkaKZBONRQCQZDZD'){

	    res.send(req.query['hub.challenge']);

	}else{

		res.send('Error, wrong validation token');

	}
});

app.post('/webhook/', function(req,res){

	var messaging_events = req.body.entry[0].messaging;



	var event = messaging_events[0];
	var sender = event.sender.id;

	if(event.message && event.message.text) {

		text = event.message.text;
		sentTextMessage(sender,text);

	}



});

function sentTextMessage(sender, text) {

	console.log("sender = " + sender + ", text = " + text);

	messageData = {
		text:"Echo: " + text
	}

	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})


}

app.listen(port, function() {

	console.log("listening");

});
