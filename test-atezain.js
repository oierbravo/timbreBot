var express = require('express');
var app = express();

var lastDate,lastState;

app.get('/set/:state',function(req,res){
	lastState = req.params.state;
	lastDate = new Date();
	res.sendStatus(200);
});
app.get('/',function(req,res){
	lastDate = new Date();
	res.json({date:lastDate,state:lastState});
});

app.listen(4545);