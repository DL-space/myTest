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

//创建一个connection,增删改查
connection.connect(function(err){

    if(err){

        console.log('[query] - :'+err);

        return;

    }

    console.log('[connection connect]  succeed!');

});

//执行SQL语句
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {

    if (err) {
        console.log('[query] - :'+err);
        return;
    }
    console.log('The solution is: ', rows[0].solution);

});
/*增加*/
function add() {
    var addVip = 'insert into user(name,sex,age) values(?,?,?)';
    var param = ['赵丽','女',30];
    connection.query(addVip, param, function(error, result){
        if(error)
        {
            console.log(error.message);
        }else{
            console.log('insert id: '+result.insertId);
        }
    });
}
add();
/*删除*/
function del() {
    var addVip1 = 'delete from user where name = "赵坤"';
    connection.query(addVip1, function(error, result){
        if(error)
        {
            console.log(error.message);
        }else{
            console.log('affectedRows: '+result.affectedRows);
        }
    });
}
/*修改*/
function change() {
    var userSql = "update user set age = 100 where name = ?";
    var param2 = ["赵宁"];
    connection.query(userSql, param2, function (error, result) {
        if(error)
        {
            console.log(error.message);
        }else{
            console.log('affectedRows: '+result.affectedRows);
        }
    });
}
/*change();*/
/*查询*/
function sele() {
    connection.query('use '+user);
    connection.query('select * from '+user, function(error, results, fields){
        if (error) {
            throw error;
        }
        if (results) {
            for(var i = 0; i < results.length; i++)
            {
                console.log('%s\t%s',results[i].name,results[i].end_time);
            }
        }
    });
}
//关闭connection
connection.end(function(err){

    if(err){

        return;

    }

    console.log('[connection end] succeed!');

});