//引入axios
const {
    default: axios
} = require('axios');
//引入utils/wx.js
const {
    createSign,
    createOrder,
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
    const data = await createOrder(orderUrl, sendData);
    const { return_code , return_msg , result_code , code_url } = data.xml;
    //判断是否下单成功
    if(return_code == 'SUCCESS' && return_msg == 'OK' && result_code == 'SUCCESS'){
        data.xml.payUrl = await QRCode.toDataURL(code_url);
    }
    console.log(data);
    
    ctx.body = {
        status: 200,
        data
    }
}


//微信下单回调
module.exports.notify = async (ctx) => {
    //打印微信服务器回调接口时的请求报文
    const { appid,bank_type,cash_fee,fee_type,is_subscribe,mch_id,nonce_str,openid,out_trade_no,sign,time_end,total_fee,trade_type,transaction_id } = ctx.request.body.xml;
    //根据商户订单号查询支付订单表是否存在此订单
    const data = await query(`select * from payorder where out_trade_no = ?`,[out_trade_no]);
    //判断微信回调是否发送多次订单信息
    if(data.length) return;

    //数据库添加字段
    const result = await query(`insert into payorder(appid, bank_type,cash_fee,fee_type,is_subscribe,mch_id,nonce_str,openid,out_trade_no,sign,time_end,total_fee,trade_type,transaction_id) values('${appid}','${bank_type}','${cash_fee}','${fee_type}','${is_subscribe}','${mch_id}','${nonce_str}','${openid}','${out_trade_no}','${sign}','${time_end}','${total_fee}','${trade_type}','${transaction_id}')`);

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

    const data =  await createOrder(orderquery, sendData);

    ctx.body = {
        status:200,
        data
    }
}