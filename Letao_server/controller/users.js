//导入校验joi
const Joi = require('joi');

//导入model层users
const {
    register,
    findUserByName,
    login
} = require('../model/users');

//导入加密文件
const {
    cryptoPwd
} = require('../utils/crypto');
const {
    secret,
    jwtsecret
} = require('../config');

//引入jwt
const jwt = require('jsonwebtoken');



//导出函数

//注册
module.exports.userRegister = async (ctx) => {
    //获取请求数据
    const {
        username,
        password,
        mobile
    } = ctx.request.body;

    //拦截 参数校验 是否合法
    const schema = Joi.object({
        username: Joi.string().min(3).max(20).required(),
        password: Joi.string().pattern(/^[a-zA-Z0-9]{6,20}$/),
        repeat_password: Joi.ref('password'),
        mobile: Joi.string().pattern(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)
    })

    const verify = schema.validate({
        username,
        password,
        mobile
    })

    //不合法返回提示信息 并退出
    if (verify.error) {
        ctx.body = {
            status: 500,
            msg: verify.error.details[0].message
        }

        return;
    }
    //判断用户名是否存在
    const user = await findUserByName(username);

    console.log(user);


    if (user[0]) {
        ctx.body = {
            status: 500,
            msg: '用户名已注册'
        }
    } else {
        //新增数据库字段
        await register(username, cryptoPwd(password + secret), mobile);

        ctx.body = {
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
    //       smscode: '短信验证码'
    //     }
    //   ]
    // console.log(result);
    //如果有值
    if (result[0]) {
        //使用jsonwebtoken包 创建token
        const token = jwt.sign({
            username,
            password
        },jwtsecret,{ expiresIn : '1h' })

        // 返回响应
        ctx.body = {
            status: 200,
            userInfo: {
                token,
                username,
                mobile:result[0].mobile,
            },
            msg: '登录成功'
        }
    }
}
