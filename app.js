var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');


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

for(var i = 0; i < messaging_events.length; i++) {

	var event = req.body.entry[0].messaging[i];
	var sender = event.sender.id;

	if(event.message && event.message.text) {

			text = event.message.text;
			sentTextMessage(sender,text);

	}

}

});

function sentTextMessage(sender, text) {

	messageData = {
		text:text
	}

	var request = {
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		};

	var post_req = http.request({},function(res){
		res.setEncoding('utf8');
		res.on('data', function(chunk){
			console.log('Response: ' + chunk);
		});
	});

	post_req.write(request);
	post_req.end();



}

app.listen(port, function() {

	console.log("listening");

});
