# Nuxt_Letao
移动端项目: Nuxt乐淘项目

## 技术栈
- 前端: Nuxt
- 后端: Koa JWT 微信支付 短信验证(腾讯云) 加密
- 数据库: mysql


## 项目初始化
[koa-generator生成器](https://www.npmjs.com/package/koa-generator)

### 安装
```
yarn koa-generator

npm install -g koa-generator
```

### 生成
```
koa2 项目名
```

### 启动
```js
//node启动服务,修改时需要重新打包
yarn start

//nodemon启动服务,实时编译
yarn dev
```

### 目录
* bin/www  服务启动文件
* routes   koa路由文件
* public   资源文件
* app.js   入口文件
* views    模板文件
* package.json


### 参考资料
前端
* [@nuxtjs/axios](https://www.npmjs.com/package/@nuxtjs/axios)
* [@nuxtjs/proxy](https://www.npmjs.com/package/@nuxtjs/proxy)

后端
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [koa-jwt](https://www.npmjs.com/package/koa-jwt)
* [mysql](https://www.npmjs.com/package/mysql)
* [crypto加密](http://nodejs.cn/api/crypto.html)
* [koa](https://koa.bootcss.com/#context)
* [Joi](https://www.npmjs.com/package/joi)
* [koa-cors](https://www.npmjs.com/package/koa-cors)
* [微信支付开发文档](https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=9_1)

