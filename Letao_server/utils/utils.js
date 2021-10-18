//连接阿里云SDK 短信验证
module.exports.sendSms = () => {
    var client = new Core({
        accessKeyId: `${process.env.accessKeyId}`,
        accessKeySecret: `${process.env.accessKeySecret}`,
        // securityToken: '<your-sts-token>', // use STS Token
        endpoint: 'https://dysmsapi.aliyuncs.com',
        apiVersion: '2017-05-25'
    });

    var params = {
        "PhoneNumbers": mobile,
        
    }

    const requestOption = {
        method: 'POST'
    };

    client.request('SendSms', params, requestOption).then((result) => {
        return JSON.stringify(result);
    }, (ex) => {
        return ex;
    })
}