const router = require('koa-router')()

//引入controller层users
const { UserRegister , login } = require('../controller/users');

router.prefix('/users')

//注册
router.post('/register', UserRegister);

//登录
router.post('/login',login);

module.exports = router
