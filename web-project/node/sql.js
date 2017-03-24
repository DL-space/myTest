//链接数据库
var mysql = require("mysql");
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"3233yujie",
    port:'3306',
    database:"test"
});
connection.connect(function(err){
    if(err){
        console.log('[query] - :'+err);
        return;
    }
    console.log('[connection connect]  succeed!');

});

/*connection.end();*/
module.exports = connection;


