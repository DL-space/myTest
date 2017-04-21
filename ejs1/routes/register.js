var express = require('express');
var router = express.Router();
// 实现与MySQL交互
var mysql = require('mysql');
var sql = require('../sql/sql');
// 使用连接池，提升性能
var pool = mysql.createPool(sql.mysql);
/* GET register page. */
router.get('/', function(req, res, next) {
  //数据填充模板
  res.render('register', { title: '注册' });
});

router.post('/register', function (req, res, next) {
  //获取前台请求的参数
  var name = req.body.name;
  var sex = req.body.sex;
  var age = req.body.age;
  pool.getConnection(function (err, connection) {//链接数据库
    //先判断该账号是否存在
    var $sql = "select * from user1 where name=?";
    connection.query($sql, [name], function (err, result) {
      console.log(name,sex,age);
      console.log("链接成功");
      console.log(result);
      var resultJson = result;
      console.log(resultJson.length);
      if (resultJson.length !== 0) {
        result = {
          code: 300,
          msg: '该账号已存在'
        };
        res.json(result);
        connection.release();//释放连接
      } else {  //账号不存在，可以注册账号
        // 建立连接，向表中插入值
        var $sql1 = "INSERT INTO user1(name, sex, age) VALUES(?,?,?)";
        connection.query($sql1, [name, sex, age], function (err, result) {
          console.log(result);
          if (result) {
            result = {
              code: 200,
              msg: '注册成功'
            };
          } else {
            result = {
              code: 400,
              msg: '注册失败'
            };
          }
          res.json(result); // 以json形式，把操作结果返回给前台页面
          connection.release();// 释放连接
        });
      }
    });
  });
});

module.exports = router;
