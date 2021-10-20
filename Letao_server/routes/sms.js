//引入router
const router = require('koa-router')();

const { sms } = require('../controller/sms');

//响应post请求
router.post('/sms',sms);

module.exports = router;