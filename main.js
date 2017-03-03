#!/usr/bin/env node

var ejs = require("ejs");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");
//var lessMiddleware = require("less-middleware");
var express = require("express");
var fs = require('fs');
var Login = require('./login');
var Register = require('./register')
var Site = require('./site')

var app = module.exports = express();
var site = new Site();

const HOST = "0.0.0.0";
const PORT = "8887";

// express configure
app.set('views', __dirname + '/views');  
app.engine(".html", ejs.__express);
app.set('view engine', 'html');  
//app.use(lessMiddleware({src: __dirname + '/public'}));
app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cookieSession({
	secret: '123456'
}));

app.post('/login', function(req, res) {
	var login = new Login(req, res);
	login.try_login();
});

app.post('/register', function(req, res){
	var register = new Register(req, res);
	register.try_register();
});

app.get('/game', function(req, res){
	if(req.session.is_login === 1) {
		fs.readFile('public/hall.html', 'utf8', function(error, data){
			if(error){
				res.end("sorry, error occur");
			}
			else{
				res.end(data);
			}
		});
	}
	else{
		res.end("not login yet");
	}
});

app.post('/sit_down', function(req, res) {
	site.try_seat(req.session.uid, on_sit_down_over, res);
});

app.listen(PORT, HOST);
console.log(`server run at ${HOST}:${PORT}`)

function on_sit_down_over(err, rows, res) {

	if(!err && rows.length === 1) {
		var player = {};
		player.id = rows[0].id;
		player.name = rows[0].name;

		site.add_player(player);
	}

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(site.get_players()));
}
