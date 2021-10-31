//引入utils中的方法
const { sendSms , getSMSCode } = require('../utils/sms');

//短信验证
module.exports.sms = async (ctx) => {
    //请求参数手机号
    const { mobile } = ctx.request.body;

    //短信验证码 4位数字
    const smscode = getSMSCode(6);
    const result = await sendSms(mobile,smscode);

    //判断是否发送失败
    if(result.SendStatusSet[0].Code != 'Ok'){
        ctx.body = {
            status: 500,
            msg: result.SendStatusSet[0].Message
        }
        return;
    }
    console.log(result);
    ctx.body = {
        status: 200,
        smscode,
        msg: '短信发送成功'
    }
}