var Board = require("firmata");
var TelegramBot = require('node-telegram-bot-api');

var token = '241188025:AAFaCDFnwKmsQdkmHaQHLZaCW22jSYT7VOA';


var timeoutDuration = 5000;


// Setup polling way
var bot = new TelegramBot(token, {polling: true});
Board.requestPort(function(error, port) {
  if (error) {
    console.log(error);
    return;
  }

  var board = new Board(port.comName);

  board.on("ready", function() {
    var pin = 13;
    var state = 1;
    var statePin 12;
    
    board.pinMode(pin, board.MODES.OUTPUT);

   /* setInterval(function() {
      board.digitalWrite(pin, (state ^= 1));
    }, 500);*/
    //self.piztu = function(){
    	
    //}
    //self.piztu();
	bot.onText(/Pop/, function (msg, match) {
	  var fromId = msg.from.id;
	  var resp = match[1];
	  bot.sendMessage(fromId, 'Ding!');
	  //console.log('Ding!');
	  board.digitalWrite(pin,1);
	  	setTimeout(function(){
	  		board.digitalWrite(pin,0);
	  		clearInterval();
	  	},timeoutDuration);
	
	  	
	  
	
	  
	});
	bot.onText(/Who/, function (msg, match) {
          var fromId = msg.from.id;
          var resp = match[1];
          if(state === 1){
             bot.sendMessage(fromId, 'Nadie!');
          } else {
              bot.sendMessage(fromId, 'Alguien!');
          }




        });


  });
}); 


