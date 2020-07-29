# Express - curd

## 起步

- 初始化
- 安装依赖
- 模板处理


## 模块化思想

模块职责单一

## 路由设计

| 请求方法 | 请求路径            | get参数 | post参数                     | 备注       |
|:----:|:---------------:|:-----:|:--------------------------:|:--------:|
| GET  | /membes         |       |                            | 渲染首页     |
| GET  | /members/new    |       |                            | 渲染添加学生页面 |
| POST | /members/new    |       | name,age,gender,hobbies    | 处理添加学生请求 |
| GET  | /members/edit   | id    |                            | 渲染编辑页面   |
| POST | /members/edit   |       | id,name,age,gender,hobbies | 处理编辑请求   |
| GET  | /members/delete | id    |                            | 处理删除请求   |



## 基本实现步骤

1. 处理模板
2. 配置开放静态资源
3. 配置模板引擎
4. 简单路由: /members 渲染静态页面
5. 路由设计
6. 提取路由模块
7. 封装members.js
8. 写好members.js文件结构
	 - 查询列表	API find
	 - FindById
	 - save
	 - updateById
	 - deleteById
9. 实现具体功能
	 - 通过路由收到请求
	 - 接收请求中的数据（get，post）
	 	 + req.query (GET)
	 	 + req.body (POST)
	 - 调用数据操作API处理数据
	 - 根据操作结果给客户端发送响应

## ES6 语法

- find
- findIndex