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

//加载路由
const index = require('./routes/index')
const users = require('./routes/users')

// error handler 错误处理
onerror(app)

// middlewares 中间件
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

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

// routes  注册路由
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling  一旦监听到异常 打印看到报错信息
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
