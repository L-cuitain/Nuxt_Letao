const router = require('koa-router')()

//引入controller层users
const { register } = require('../controller/users');

router.prefix('/users')

//注册
router.get('/register', register);



module.exports = router
