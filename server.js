/**
 * Created by DL on 2016/11/28.
 */
var express = require('express');
var http = require("http");
var port = '3003';
var path = require('path');
var app = express();
app.use(express.static(__dirname));
app.set("port",port);
var server = http.createServer(app);
server.listen(port);