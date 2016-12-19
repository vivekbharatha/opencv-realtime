/**
 * Created by vivek on 19/12/16.
 */
var express = require('express');
var http = require('http');
var morgan = require('morgan');
var serverConfig = require('./config/serverConfig');
var opencvCore = require('./core/opencvCore');

var app = express();
app.set('port', process.env.PORT || serverConfig.PORT);
app.use(express.static(serverConfig.staticPath));
app.use(morgan('dev'));

var server = http.createServer(app);

server.listen(app.get('port'), function () {
    console.log('Server is up at: ' + app.get('port'));
});

var io = require('socket.io')(server);
io.on('connection', opencvCore);

module.exports.app = app;
