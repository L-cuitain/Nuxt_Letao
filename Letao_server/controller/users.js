//导入model层users
const {
    register,
    findUserByName
} = require('../model/users');

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



