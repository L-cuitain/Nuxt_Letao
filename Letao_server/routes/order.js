//引入router
const router = require('koa-router')();

//引入controller层order
const { order } = require('../controller/order');

//微信下单
router.post('/order',order);

//导出router
module.exports = router;