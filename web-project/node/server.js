/**
 * Created by DL on 2017/3/14.
 */
var http = require("http");
var app = require("./app");
var port = "3006";
app.set("port",port);
var server = http.createServer(app);
server.listen(port);
