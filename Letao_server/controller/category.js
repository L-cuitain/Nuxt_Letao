//引入model层的category
const { oneCategory , twoCategory } = require('../model/category');

//获取一级分类
module.exports.oneCategory = async (ctx) => {
    const oneCategoryList = await oneCategory();

    ctx.body = {
        status : 200,
        oneCategoryList
    }
}

//获取二级分类
module.exports.twoCategory = async (ctx) => {
    //获取传入的id
    const { id } = ctx.request.query;

    //查询数据库
    const twoCategoryList = await twoCategory(id);

    ctx.body = {
        status : 200,
        twoCategoryList
    }
}