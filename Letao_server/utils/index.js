//MD5加密
const crypto = require('crypto');

//对用户注册成功后的密码进行MD5加密生成密文返回
module.exports.cryptoPwd = (pwd) => {
    return crypto.createHash('MD5').update(pwd).digest('hex');
}


//生成随机字符串
module.exports.getRandomStr = () => {
    return 'D' + new Date().getTime();
}

//生成签名
module.exports.createSign = (args) => {
    //对参数按照key=value的格式,并按照参数ASCII字典排序
    const sortedParams = Object.keys(args).sort().reduce((prev,next) => {
        return prev += `${prev}=${args[next]}&`
    },'').concat()
}

//生成指定范围随机数
module.exports.getRandom = (min,max) => {
    //返回随机数
    return Math.floor(Math.random() * (max - min) + 1);
}
