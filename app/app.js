#!/usr/bin/env node

var express = require('express');
var http = require('http')
var path = require('path');
var socketio = require('socket.io');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 80);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('123456789987654321'));
	app.use(express.session());
	app.use(app.router);
	app.use(require('stylus').middleware(__dirname + '/public'));
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

// Webserver:
var server = http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});

// Socket IO
var io = socketio.listen(server);
io.set('log level', 0);


app.get('/', function(req, res){
	res.render('index', { title: 'Wouter Counter' });
});

app.get('/controller', function(req, res){
	res.render('controller', { title: 'Controller' });
});

app.post('/rest/starttimer', function (req, res){
	io.sockets.emit('starttimer', {} );

	res.send("starttimer send");
});

app.post('/rest/banana', function (req, res){
	io.sockets.emit('banana', {} );

	res.send("banana send");
});

app.post('/rest/stopbanana', function (req, res){
	io.sockets.emit('stopbanana', {} );

	res.send("stopbanana send");
});


