/**
* members.js
* 数据操作文件模板
* 职责：
*   操作文件中的数据，只处理数据，不关心业务
*/
var fs = require('fs')

var dbPath = './db.json'

// 获取所有成员列表
// callback() 中的参数
//  + 第一个是err
//    - 成功是 null 
//    - 错误是 错误对象
//  + 第二个是结果
//    - 成功是 数组
//    - 错误是 undifined
//
// 封装异步API

exports.find = function (callback) {
  fs.readFile(dbPath, 'utf-8', function (err, data) {
    if (err) {
      return callback(err)
    }
    callback(null, JSON.parse(data).members)
  })
}

// 添加保存成员信息
exports.save = function (obj, callback) {
  fs.readFile(dbPath, function (err, data) {
    if (err) {
      return callback(err)
    }

    var members = JSON.parse(data).members
    obj.id = members[members.length-1].id + 1
    members.push(obj)

    var fileData = JSON.stringify({
      members: members
    })

    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}

// 更新修改成员信息
exports.updateById = function (obj, callback) {
  fs.readFile(dbPath, 'utf-8', function (err, data) {
    if (err) {
      return callback(err)
    }
    var members = JSON.parse(data).members
    
    // 需要修改谁就将其找出来
    // ES6 中的一个数组方法：需要接收一个函数作为参数
    // 当某个遍历项符合 item.id  === obj.id 条件的时候，
    // find会终止遍历，同时返回遍历项
    var mem = members.find(function (item) {
      return item.id === obj.id
    })

    // 遍历拷贝，使用一个for...in循环获取到属性名并逐一修改目标对象的值 
    for (var key in obj) {
      mem[key] = obj[key]
    }

    var fileData = JSON.stringify({
      members: members
    })
    
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}

// 删除成员
exports.delete = function() {
  
}

// 如果需要获取一个函数中异步操作的结果
// 则必须通过回调函数来获取
/*
function fn(callback) {
  setTimeout(function () {
    var data = 'hello'
    // 回调函数获取操作结果
    callback(data)
  }, 1000)
}

fn(function (data) {
  console.log(data)
})
*/