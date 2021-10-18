//引入KOA包
const Koa = require('koa')
//创建app服务
const app = new Koa()
//处理静态资源
const views = require('koa-views')
//json格式化
const json = require('koa-json')
//处理异常
const onerror = require('koa-onerror')
//解析post请求
const bodyparser = require('koa-bodyparser')
//记录日志
const logger = require('koa-logger')
//引入数据库配置dotenv
const dotenv = require('dotenv');

//引入koa-jwt
const jwt = require('koa-jwt');

//引入jwt的secret
const { jwtsecret } = require('./config');



//启动 Node env环境 先运行
dotenv.config();

//加载路由
const index = require('./routes/index')
const users = require('./routes/users')
const category = require('./routes/category');

// error handler 错误处理
onerror(app)

// middlewares 中间件
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
//静态服务器: 主要存放一些静态资源
app.use(require('koa-static')(__dirname + '/public'))

//pug模板引擎配置
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger  记录操作日志
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// 通过 koa-jwt 设置 jwt 中间件
// 判断客户端是否发送token 如果没有
// 则返回401和错误信息
app.use(function(ctx, next){
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});

//设置jwt中间件
//允许哪些路由可以使用token
//unless排除register和login不需要在请求中带token
app.use(jwt({ secret: jwtsecret }).unless({ path:[/^\/public/,/^\/users\/register/,/^\/users\/login/] }));


// routes  注册路由
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(category.routes(),category.allowedMethods());

// error-handling  一旦监听到异常 打印看到报错信息
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
