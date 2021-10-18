const router = require('koa-router')()

//引入controller层users
const { userRegister , login } = require('../controller/users');

router.prefix('/users');

//注册
router.post('/register', userRegister);

//登录
router.post('/login',login);

//短信验证
// router.post('/sendMessage',sendMessage);

module.exports = router
