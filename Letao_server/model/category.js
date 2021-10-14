//引入数据库查询文件
const { query } = require('../db/query');

//查询所有
module.exports.oneCategory = async() => {
    return await query('select * from category');
}

//根据id 查询
module.exports.twoCategory = async(id) => {
    return await query('select * from brand where id = ?',[id]);
}