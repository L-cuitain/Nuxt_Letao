//MD5加密
const crypto = require('crypto');
//引入axios
const axios = require('axios');
//引入xml2js
const xml = require('xml2js');

//获取wx支付的appId,mch_id,notify_url
module.exports.appid = process.env.appId;

module.exports.mch_id = process.env.mch_id;

module.exports.notify_url = process.env.notify_url;

module.exports.orderUrl = process.env.orderUrl;

module.exports.orderquery = process.env.orderquery;

//随机生成指定位数的随机数
module.exports.getRandomLength = (len) => {
    //创建空字符串
    let randomCount = '';
    //遍历循环添加随机数
    for(let i = 0 ; i < len ; i++){
        randomCount += this.getRandom(0,9);
    }

    return randomCount;
}

//生成随机字符串 不重复
module.exports.getRandomStr = () => {
    return 'letao' + this.getRandomLength(6) + new Date().getTime();
}

//生成签名
module.exports.createSign = (args) => {
    //对参数按照key=value的格式,并按照参数ASCII字典排序
    const sortedParams = Object.keys(args).sort().reduce((prev,next) => {
        return prev += `${next}=${args[next]}&`
    },'').concat(`key=${process.env.key}`);

    return crypto.createHash('MD5').update(sortedParams).digest('hex').toUpperCase()
}

//微信下单
module.exports.createOrder = (url,params) => {
    //发送请求
    return new Promise(async (res,rej) => {
        //axios请求
        const data = await axios({
            url,
            method: 'POST',
            data: params
        })

        //使用xml的parseString方法 将xml转成json
        xml.parseString(data.data,function(err,data){
            res(data);
        })
    })
}


//生成指定范围随机数
module.exports.getRandom = (min,max) => {
    //返回随机数
    return Math.floor(Math.random() * (max - min) + 1);
}

//生成商户订单号
module.exports.getTrade_no = () => {
    return this.getRandomStr() + this.getRandomLength(5);
}
