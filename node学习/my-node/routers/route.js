/**
 * Created by DL on 2017/3/1.
 */
var express = require('express');
var router = express.Router();
router.get('/hh', function(req, res){
    res.redirect('/hh.html');
 });
router.get('/aa', function(req, res){
    res.redirect('/aa.html');
});
router.all('*', function(req, res, next){
    res.end('404 not found');
});
module.exports = router;



