
var sentiment = require('sentiment');


function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isWhatsUp(text){

  text = text.toLowerCase();

  var wuComp1 = "what's up";
  var wuComp2 = "wassup";
  var wuComp3 = "sup";
  var wuComp4 = "wuu2";
  var wuComp5 = "whatsup";
  var wuComp5 = "whats up";
  var wuComp6 = "watsup";

  return text.indexOf(wuComp1) > -1 || text.indexOf(wuComp2) > -1 || text.indexOf(wuComp3) > -1 || text.indexOf(wuComp4) > -1 || text.indexOf(wuComp5) > -1  || text.indexOf(wuComp6) > -1;


}

function isQuestion(text){

  return text.indexOf("?") > -1

}

function getWhatsUpResponse(){

  var responses = ["nm u?","nothing much just bored, hby","just chilling wby"];

  var index = getRandomInt(0,2);

  return responses[index];



}

function sentimentAnalysis(text){

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

//TODO: fill this out
function respondToQuestion(text){

  text = text.toLowerCase();

  //i.e. where is the statue of liberty / where are the rocky mountains
  if(text.indexOf("where is") > -1 || text.indexOf("where are")){

  }
  //i.e. did you take out the trash
  else if(text.indexOf("do you") > -1 || text.indexOf("did you")){

  }
  //i.e. did the colts win today
  else if(text.indexOf("did") > -1){

  }
  //i.e. what is photosynthesis / what are meteors
  else if(text.indexOf("what is") > -1 || text.indexOf("what are") > -1){

  }
  //i.e. "how are you today?" / "how is the weather?"
  else if(text.indexOf("how are") > -1 || text.indexOf("how is") > -1){

  }
  //i.e. "who is john smith" / "who are the beatles"
  else if(text.indexOf("who") > -1){

  }



}

/**
    analyze text for appropriate response

    @param {string} text

    @return {string}
  */


  module.exports =  function(text){

  	if(isWhatsUp(text)){

      return getWhatsUpResponse();

  	}
    else if(isQuestion(text)){

      return respondToQuestion(text);

    }
  	else{

      return sentimentAnalysis(text);

  	}

}
