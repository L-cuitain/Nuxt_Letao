//MD5加密
const crypto = require('crypto');

//对用户注册成功后的密码进行MD5加密生成密文返回
module.exports.cryptoPwd = (pwd) => {
    return crypto.createHash('MD5').update(pwd).digest('hex');
}

