/**
 * Created by DL on 2017/3/1.
 */
var express = require('express');
var url = require("url");
var router = express.Router();
var User = require("../user.js");
router.get('/', function(req, res){
    res.redirect('/register.html');
});
router.get('/hh', function(req, res){
    res.redirect('/hh.html');
 });
router.get('/aa', function(req, res){
    res.redirect('/images');
});
router.get('/register', function(req, res){
    console.log(req.query.name);
    console.log(req.query.sex);
    console.log(req.query.age);
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
    res.redirect('/hh.html');
});
router.all('*', function(req, res, next){
    res.end('404 not found');
});
module.exports = router;



