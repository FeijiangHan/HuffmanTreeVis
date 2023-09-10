var mysql = require('mysql')
var mysql_user = {
    host:'sh-cynosdbmysql-grp-4mtres8m.sql.tencentcdb.com:23351',//主机地址（默认为：localhost）
    user:'chase666',//用户名
    password:'Chase666',//密码
    database:'csu'//数据库名
};

var connection = mysql.createConnection(mysql_user,{multipleStatements: true});//创建一个连接
//multipleStatements: true  此功能打开可同时使用多条  查询语句

module.exports = {
    connection //将此模块给暴露出去
};
