//cargamos la configuracion
var config = require('./config.js');

//Cargamos modulos
var TelegramBot = require('node-telegram-bot-api');
var bot = new TelegramBot(config.telegram_token, {polling: true});

var five = require("johnny-five");

//variables johnny-five
var button, timbreLed, stateLed, state;

//inicializamos johnny y esperamos el evento 'ready'
five.Board().on("ready", function() {
  console.log('Ready!');
  //config boton
  button = new five.Button({
    pin: 2,
    isPullup: true
  });
  
  //config leds
  timbreLed = new five.Led(14);
  stateLed = new five.Led(13);

  //variable estado.
  state = 0;

  //[arduino] Evento down
  button.on("down", function(value) {
    
    //Lo invertimos segun el estado.
    if(state === 0){
      state = 1;
    } else {
      state = 0;
    }
  });

  //[arduino] Evento up
  button.on("up", function() {
    //Encendemos el led segun el estado.
    if(state === 0){
      stateLed.off();
    } else {
      stateLed.on();
    }
  });

  //[telegram] Evento palabra: Pop
  bot.onText(/Pop/, function (msg, match) {
	  //guardamos el id del cliente.
    var fromId = msg.from.id;

    //enviamos la respuesta al cliente.
	  bot.sendMessage(fromId, 'Ding!');

    //encendemos el led.
    timbreLed.on();	
      //lo apagamos pasado el tiempo.
	  	setTimeout(function(){
	  		timbreLed.off();
        //limpiamos el interval.
	  		clearInterval();
	  	},config.timbreLedTimeout);
  });	  	

  //[telegram] Evento palabra: 'Who'.
	bot.onText(/Who/, function (msg, match) {
    //guardamos el id del cliente.
    var fromId = msg.from.id;
    //verificamos el estado.
    if(state === 0){
      //nadie
      //respondemos al cliente
      bot.sendMessage(fromId, config.msgNadie);
    } else {
      //alguien
      //respondemos al cliente
      bot.sendMessage(fromId, config.msgAlguien);
    }
	});
});
