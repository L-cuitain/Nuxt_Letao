const router = require('koa-router')()

//引入controller 必须解构
const { gridList , sportList , swipeList } = require('../controller');

//获取宫格列表
router.get('/gridList',gridList);

//获取运动专区
router.get('/sportList',sportList);

//获取轮播图
router.get('/swipeList',swipeList);

module.exports = router
