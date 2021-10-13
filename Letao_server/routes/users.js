const router = require('koa-router')()

//引入controller层users
const { register , login } = require('../controller/users');

router.prefix('/users')

//注册
router.post('/register', register);

//登录
router.post('/login',login);

module.exports = router
