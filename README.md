### 项目说明
使用koa，art-template，koa-router，mongoose等实现的一个简易的留言板功能，包括发表留言，删除留言，留言列表展示。
注意：项目启动前，本地mongodb server应处于开启状态。
### 项目结构
```
.
|--views  // 模板文件
  |—-add.art  // 新增留言页面
  |--index.art  // 留言列表页面（主页）
|--public  // 静态资源
|--app.js  // 项目入口文件
|--db      // mongodb数据库
  |--config.js  // 数据库基础设置
  |--model.js   // mongoose的model
```

* 框架：koa（轻量级node服务）
* 路由：koa-router
* 模板：art-template
* 静态资源处理：koa-static
* 数据库：mongodb

### 启动项目
```
node app.js
```

### 遗留问题
art-template在作为后端渲染模板使用时，与作为前端模板使用时冲突，因为无法正常使用前端模板语法，因此在查询更新页面时遇到瓶颈，目前暂时未解决ajax查询结果后局部渲染页面的功能。
由于该原因，项目重构将使用vue进行前端模板的渲染，敬请期待，谢谢～

   

