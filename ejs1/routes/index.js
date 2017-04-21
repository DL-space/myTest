var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //数据填充进模板
  res.render('index', { title: '欢迎' });
});

module.exports = router;
