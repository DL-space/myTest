var express = require('express');
var router = express.Router();


//显示首页
/*router.get('/', function(req, res){
    console.log('/');
    //显示页面
    res.redirect('/hh.html');
    // data
});*/
router.get('/aa', function(req, res){
    console.log('/');
    //显示页面
    res.send('/aa.html');
    // data
});

router.all('*', function(req, res, next){
    res.end('404 not found');
});

module.exports = router;


