var express = require('express');
var bodyParser = require('body-parser');


var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use( bodyParser.json());

app.post('/webhook/', function(req,res){
	if(req.query['hub.verify_token'] === 'CAAMO2Q6yOFgBAG2io6VBdbplg8cCmF5ZC2rydqNACYmBZCIKKa8JZAmHVPISsCXSKhWrLMdHNMRWdUEZC7h5HEGtkEPKcuVe7rPuFyWwlwhOrSdZAGMegSh6dyW7G3h4sY5Ptfr8y762QFXp08pQOOfiFCIXcWLvB0NvWFSH416ZAPJqv7hUmIO5b8mhrZBDurxkaKZBONRQCQZDZD'){

	    res.send(req.query['hub.challenge']);

	}else{

		res.send('Error, wrong validation token');

	}
    });

app.listen(port, function() {

	console.log("listening");

});
