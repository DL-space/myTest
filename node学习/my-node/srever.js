/**
 * Created by DL on 2016/11/28.
 */
var app  = require("./app");
var http = require("http");
var port = '3003';
app.set("port",port);
var server = http.createServer(app);
server.listen(port);