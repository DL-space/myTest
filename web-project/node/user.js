/**
 * Created by DL on 2017/3/14.
 */
var connection = require("./sql");
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
