//引入路由
const router = require('koa-router')();
//引入controller层category
const { oneCategory , twoCategory } = require('../controller/category');

//获取一级分类
router.get('/oneCategory',oneCategory);

//获取二级分类
router.get('/twoCategory',twoCategory);

module.exports = router;
