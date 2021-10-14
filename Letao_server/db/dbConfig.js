//导出数据库配置
module.exports.dbConfig = {
    dev: {
        //连接池最大连接数
        connectonLimit: 10,
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'nuxt_koa_letao'
    },
    uat:{
        //连接池最大连接数
        connectonLimit: 10,
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'nuxt_koa_letao'
      },
      prd:{
        //连接池最大连接数
        connectonLimit: 10,
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'nuxt_koa_letao'
      }
}