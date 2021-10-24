//引入axios
const {
    default: axios
} = require('axios');
//引入utils/wx.js
const {
    createSign,
    orderHandle,
    getRandomStr,
    getTrade_no,
    appid,
    mch_id,
    notify_url,
    orderUrl
} = require('../utils/wx');

//引入qrcode
const QRCode = require('qrcode');
const { query } = require('../db/query');

//微信下单
module.exports.order = async (ctx) => {
    //前端调用下单接口时传递的参数
    const {
        body,
        total_fee,
        spbill_create_ip,
        trade_type
    } = ctx.request.body;

    //下单需要的参数
    const params = {
        appid, //公众账号ID
        mch_id, //商户号
        nonce_str: getRandomStr(), //随机字符串
        body, //商品描述
        out_trade_no: getTrade_no(), //商户订单号
        total_fee, //标价金额
        spbill_create_ip, //终端IP
        notify_url, //通知地址
        trade_type, //交易类型
    }

    //生产签名 需要发送的参数生成
    const sign = createSign(params);
    //微信下单请求
    let sendData = `
    <xml>
        <appid>${appid}</appid>
        <body>${body}</body>
        <mch_id>${mch_id}</mch_id>
        <nonce_str>${params.nonce_str}</nonce_str>
        <notify_url>${notify_url}</notify_url>
        <out_trade_no>${params.out_trade_no}</out_trade_no>
        <spbill_create_ip>${spbill_create_ip}</spbill_create_ip>
        <total_fee>${total_fee}</total_fee>
        <trade_type>${trade_type}</trade_type>
        <sign>${sign}</sign>
    </xml>
    `

    //返回数据
    const data = await orderHandle(orderUrl, sendData);
    const { return_code , return_msg , result_code , code_url } = data;
    //判断是否下单成功
    if(return_code == 'SUCCESS' && return_msg == 'OK' && result_code == 'SUCCESS'){
        //把订单数据写入到payorder
        await query(`insert into payorder (appid,mch_id,nonce_str,body,out_trade_no,total_fee,spbill_create_ip,trade_type,trade_state) values ("${appid}","${mch_id}","${params.nonce_str}","${body}","${params.out_trade_no}","${total_fee}","${spbill_create_ip}","${trade_type}","NOTPAY")`);
        data.payUrl = await QRCode.toDataURL(code_url);
        //把随机字符串 和商户订单号传给前端
        data.nonce_str = params.nonce_str;
        data.out_trade_no = params.out_trade_no;
    }
    console.log(data);
    
    ctx.body = {
        status: 200,
        data
    }
}


//微信下单回调
module.exports.notify = async (ctx) => {
    const { out_trade_no } = ctx.request.body.xml;
    console.log(ctx.request.body.xml);

    //根据商户订单号更新订单状态
    await query(`update payorder set trade_state = "SUCCESS" where out_trade_no = "${out_trade_no}"`);
    //响应微信服务器接口,订单处理成功,无需重复通知
    ctx.body = `<xml>
    <return_code><![CDATA[SUCCESS]]></return_code>
    <return_msg><![CDATA[OK]]></return_msg>
  </xml>`
}


//微信订单查询
module.exports.queryOrder = async (ctx) => {
    const {nonce_str, out_trade_no} = ctx.request.body;
    let params = {
        appid,
        mch_id,
        nonce_str, // 32位以内的随机字符串,
        out_trade_no
    };
    // 生成签名
    let sign = createSign(params);

    let sendData = `
       <xml>
            <appid>${appid}</appid>
            <mch_id>${mch_id}</mch_id>
            <nonce_str>${nonce_str}</nonce_str>
            <out_trade_no>${out_trade_no}</out_trade_no>
            <sign>${sign}</sign>
       </xml>
    `

    const data =  await orderHandle(orderquery, sendData);

    ctx.body = {
        status:200,
        data
    }
}