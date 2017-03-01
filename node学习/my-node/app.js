/**
 * Created by DL on 2017/3/1.
 */
var express = require('express');
var path = require('path');
var myRouter = require('./routers/route');
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(myRouter);
module.exports = app;

