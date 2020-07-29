/*
* router.js 路由模块
* 职责：
*     处理路由
*     根据不同的请求方法+请求路径设置具体的请求处理函数
* 模块职责要单一，不能乱写
* 划分模块的目的是为了增强代码的可维护性与提升开发效率
*/
var fs = require('fs')
var express = require('express')
var Members = require('./members')

// 方式一 不太合理，不予采用
// var app = require('./app')

// 方式二
// module.exports = (app) => {
//   app.get('/members', (req, res) => {
//     // readFile 的第二个参数是可选的，读取到的文件直接按照utf-8编码
//     // 除了这样转换之外，也可以通过data.toString()的方式
//     fs.readFile('./db.json', 'utf-8', (err, data) => {
//       if (err) {
//         return res.status(500).send('Server error.')
//       }
//       // 文件中读取到的数据是字符串格式，需要转换为对象来使用
//       var members = JSON.parse(data).members
//       res.render('index.html', {
//         nogis: [
//           'Kakki',
//           'Sakura',
//           'Yuna',
//           'Mayu'
//         ],
//         members: members
//       })  
//     })
//   })
// }

// 方式三 Express提供的方法 采用此方式更好
var router = express.Router()

router.get('/members', (req, res) => {
  // readFile 的第二个参数是可选的，读取到的文件直接按照utf-8编码
  // 除了这样转换之外，也可以通过data.toString()的方式
  /*fs.readFile('./db.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send('Server error.')
    }
    // 文件中读取到的数据是字符串格式，需要转换为对象来使用
    var members = JSON.parse(data).members
    res.render('index.html', {
      nogis: [
        'Kakki',
        'Sakura',
        'Yuna',
        'Mayu'
      ],
      members: members
    })  
  })*/

  Members.find(function(err, members) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.render('index.html', {
      nogis: [{
        name: 'Kakki',
        img: '/public/img/kakki.jpg'
      }, {
        name: 'Yuna',
        img: '/public/img/yuna.jpg'
      }, {
        name: 'Mayu',
        img: '/public/img/mayu.jpg'
      }, {
        name: 'Sakura',
        img: '/public/img/sakura.jpg'
      }],
      members: members
    })  
  })
})

router.get('/members/new', (req, res) => {
  res.render('new.html')
})

router.post('/members/new', (req, res) => {
  // 1 获取表单数据
  // 2 处理
  //   将数据保存到db.json中用以持久化
  //    - 先读文件把数据转为对象
  //    - push数据
  //    - 将对象转为字符串
  //    - 把字符串写入文件
  // 3 发送响应
  
  Members.save(req.body, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/members')
  })
})

// 渲染编辑页面
router.get('/members/edit', (req, res) => {
  /*1. 在客户端的列表页中处理链接问题（需要有id参数）
  2. 获取要编辑的学生id
  3. 渲染编辑页面
     根据id把学生信息查找出来
     使用模板引擎渲染页面*/
  console.log(req)
  Members.findById(parseInt(req.query.id), function (err, mem) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.render('edit.html', {
      member: mem
    })
  })
})

router.post('/members/edit', (req, res) => {
  /*1. 获取表单数据
  2. 更新
     Members.updateById()
  3. 发送响应*/
  // req.body 传入的对象属性值为字符串格式
  Members.updateById(req.body, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
  })
  res.redirect('/members')
})

router.get('/members/delete', (req, res) => {
  // 1. 获取要删除的项的id
  // 2. 根据id执行删除操作
  // 3. 根据操作结果发送响应数据
  console.log(req.query.id)
})

// 导出router
module.exports = router