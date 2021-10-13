//导入model层users
const {
    register,
    findUserByName,
    login
} = require('../model/users');

//导入加密文件
const {
    cryptoPwd
} = require('../utils');
const {
    secret
} = require('../config');


//导出函数

//注册
module.exports.register = async (ctx) => {
    //获取请求数据
    const {
        username,
        password,
        mobile
    } = ctx.rquest.body;

    //判断用户名是否存在
    const user = await findUserByName(username);

    if (user) {
        return {
            status: 500,
            msg: '用户名已注册'
        }
    } else {
        //新增数据库字段
        await register(username, cryptoPwd(password + secret), mobile);

        return {
            status: 200,
            msg: '注册成功',
        }
    }
}


//登录
module.exports.login = async (ctx) => {
    //获取用户名密码
    const {
        username,
        password
    } = ctx.request.body;

    //查询数据库
    const result = await login(username, password);
    // [
    //     RowDataPacket {
    //       id: 1,
    //       username: '张三',
    //       password: '1234567890',
    //       mobile: '13843959747',
    //       smscode: '不是知道是什么'
    //     }
    //   ]
    // console.log(result);
    //如果有值
    if (result[0]) {
        // 返回响应
        ctx.body = {
            code: 200,
            userInfo: {
                username: result[0].username,
                password: result[0].password
            },
            msg: '登录成功'
        }
    }
}