var express = require('express');
var router = express.Router();
// 实现与MySQL交互
var mysql = require('mysql');
//引入数据库配置文件
var sql = require('../sql/sql');
// 使用连接池，提升性能
var pool = mysql.createPool(sql.mysql);
/* GET register page. */
router.get('/', function (req, res, next) {
    res.render('login', {title: '登录'});
});

router.post('/login', function (req, res, next) {
    //获取前台请求的参数
    var name = req.body.name;
    //链接数据库进行相关数据库操作
    pool.getConnection(function (err, connection) {
        //先判断该账号是否存在
        var $sql = "select * from user1 where name=?";//查
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
            } else {
                result = {
                    code: 300,
                };
                res.json(result);
                connection.release();//数据库操作完成，释放链接
            }
        });
    });
});

module.exports = router;
