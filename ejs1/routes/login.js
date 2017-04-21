var express = require('express');
var router = express.Router();
// 实现与MySQL交互
var mysql = require('mysql');
var sql = require('../sql/sql');
// 使用连接池，提升性能
var pool = mysql.createPool(sql.mysql);
/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: '登录' });
});

router.post('/login', function (req, res, next) {
  var name = req.body.name;
   //获取前台请求的参数
  pool.getConnection(function (err, connection) {
    //先判断该账号是否存在
    var $sql = "select * from user1 where name=?";
    connection.query($sql, [name], function (err, result) {
      console.log(name);
      console.log("链接成功");
      console.log(result);
      var resultJson = result;
      console.log(resultJson.length);
      if (resultJson.length !== 0) {
        result = {
          code: 200,
        };
        res.json(result);
        connection.release();
      }else{
        result = {
          code: 300,
        };
        res.json(result);
        connection.release();
      }
    });
  });
});

module.exports = router;
