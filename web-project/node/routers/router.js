/**
 * Created by DL on 2017/3/14.
 */
var express = require('express');
var url = require("url");
var router = express.Router();
var User = require("../user.js");
router.get("/",function (req,res) {
    res.redirect("/register.html");
});
router.get("/register",function (req,res) {
    var newUser = new User({
        username: req.query.name,
        usersex: req.query.sex,
        userage: req.query.age
    });
    newUser.save(function (err,result) {
        if (err) {
            res.locals.error = err;
            res.render('reg', { title: "title" });
            return;
        }
    });
    res.redirect("/login.html");
});
router.all('*', function(req, res, next){
    res.end('404 not found');
});
module.exports = router;
