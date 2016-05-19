
var sentiment = require('sentiment');


function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
    analyze text for appropriate response

    @param {string} text

    @return {string}
  */


  module.exports =  function(text){

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
