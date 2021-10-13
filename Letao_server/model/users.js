//引入query
const { query } = require('../db/query');

//注册
module.exports.register = async (username,password,mobile) => {
    //返回查询结果
    return await query(`insert into user(username, password, mobile) VALUES ('${username}','${password}','${mobile}');`)
}


//是否注册(根据用户名查询数据)
module.exports.findUserByName = async (username) => {
    //返回查询结果
    return await query(`select * from user where username = ?;`,[username]);
}

//用户登录(根据用户名密码查询数据)
module.exports.login = async (username, password) => {
    return await query(`select * from user where username = ? and password = ?;`,[username,password]);
}