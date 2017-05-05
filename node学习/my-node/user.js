/**
 * Created by DL on 2017/3/9.
 */
var mysql  = require('mysql');  //调用MySQL模块
//创建一个connection
var connection = mysql.createConnection({
    host     : 'localhost',       //主机
    user     : 'root',            //MySQL认证用户名
    password:'3233yujie',
    port:   '3306',
    database: 'test'
});
function User(user){
    this.username = user.username;
    this.usersex = user.usersex;
    this.userage = user.userage;
}
module.exports = User;
//保存数据
User.prototype.save = function save(callback) {
    var user = {
        username:this.username,
        usersex: this.usersex,
        userage: this.userage
        };
    var insertUser_Sql = "INSERT INTO user(name,sex,age) VALUES(?,?,?)";
    connection.query(insertUser_Sql, [user.username, user.usersex, user.userage], function (err,result) {
        if (err) {
            console.log("insertUser_Sql Error: " + err.message);
            return;
        }
        console.log("invoked[save]");
    });
};
//根据用户名得到用户数量
    /*User.getUserNumByName = function getUserNumByName(username, callback) {

        var getUserNumByName_Sql = "SELECT COUNT(1) AS num FROM userinfo WHERE username = ?";
        connection.query(getUserNumByName_Sql, [username], function (err, result) {
            if (err) {
                console.log("getUserNumByName Error: " + err.message);
                return;
            }
            connection.release();
            console.log("invoked[getUserNumByName]");
            callback(err,result);
        });
    };*/
//根据用户名得到用户信息
    /*User.getUserByUserName = function getUserNumByName(username, callback) {
        var getUserByUserName_Sql = "SELECT * FROM userinfo WHERE username = ?";
        connection.query(getUserByUserName_Sql, [username], function (err, result) {
            if (err) {
                console.log("getUserByUserName Error: " + err.message);
                return;
            }
            connection.release();
            console.log("invoked[getUserByUserName]");
            callback(err,result);
        });
    };*/
