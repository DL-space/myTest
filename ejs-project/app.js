/**
 * Created by DL on 2017/3/27.
 */
var express = require("express");
var router = require("./routes");
var app = express();
app.set("view engine","ejs");
app.use(express.static(__dirname+"/static"));
app.get("/",router.index);
app.get("/form",router.form);
app.post("/form",router.create);
app.listen(1337,"127.0.0.1",function () {
    console.log("开始监听。。。。");
});