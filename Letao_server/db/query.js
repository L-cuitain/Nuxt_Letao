//引入mysql包
const mysql = require('mysql');

//引入dbConfig数据库连接文件
const { dbConfig } = require('./dbConfig');

//创建连接池
const pool =mysql.createPool(dbConfig);

//封装sql查询函数
module.exports.query = async (sql,values) => {
    return new Promise((resolve,reject) => {
        //开始连接数据
        pool.getConnection(function(err,connection){
            //抛出错误信息
            if(err) throw err;

            //使用 connection query方法
            connection.query(sql,values,function(error,results,fields){
                connection.release();

                //抛出错误
                if(error) throw error;

                //返回结果
                resolve(results);
            })
        })
    })
}