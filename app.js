var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var request = require('request');
var sentiment = require('sentiment');

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
            sendTextMessage(sender, textAnalysis(text))
        }
    }
    res.sendStatus(200)


});

function sendTextMessage(sender, text) {

	console.log("sender = " + sender + ", text = " + text);

	messageData = {
		text:text
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

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function textAnalysis(text){

	var wuComp1 = "what's up";
	var wuComp2 = "wassup";
	var wuComp3 = "sup";
	var wuComp4 = "wuu2";
	var wuComp5 = "whatsup";
	var wuComp5 = "whats up";
	var wuComp6 = "watsup";

	var responses = ["nm u?","nothing much just bored, hby","just chilling wby"];


	if(text.indexOf(wuComp1) > -1 || text.indexOf(wuComp2) > -1 || text.indexOf(wuComp3) > -1 || text.indexOf(wuComp4) > -1 || text.indexOf(wuComp5) > -1  || text.indexOf(wuComp6) > -1){

		var index = getRandomInt(0,2);

		return responses[index];

	}
	else{

		var score = sentiment(text).score;

		if(score < 0) {
			return "That sucks :/"
		}
		else if (score > 0){
			return "That's awesome :)"
		}
		else{
			return "Ah okay!"
		}
	}

	}





app.listen(port, function() {

	console.log("listening");

});
