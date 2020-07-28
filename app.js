/**
* app.js 入门模块
* 职责：
*     创建服务
*     做一些服务相关配置
*       模板引擎
*       body-parser 解析表单post表单体
*       提供静态资源服务
*     挂载路由
*     监听端口启动服务
*/

var express = require('express')
var bodyParser = require('body-parser')
var router = require('./router')

var app = express()

// 配置模板引擎和body-parser一定要在挂载路由app.use(router)之前
// parse application/x-www.form-rulecoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/node_modules/', express.static('./node_modules'))
app.use('/public/', express.static('./public'))

app.engine('html', require('express-art-template'))

// 方式二
// router(app)

// 方式三
// 把路由容器挂在到app服务中
app.use(router)

app.listen(3000, function () {
  console.log('Server is runing.')
})

// 方式一
// module.exports = app