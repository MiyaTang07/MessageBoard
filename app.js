// 基于koa
const koa = require("koa");
const router = require("./router");
// 解析request的body的功能(post请求)
const bodyParser = require('koa-bodyparser');

// 模板
const render = require("koa-art-template");

// 静态资源设置模块
const static = require("koa-static");

const path = require("path");

const app = new koa();

app.use(static(path.join(__dirname, "/public")));

// 设置模板引擎
render(app, {
  root: path.resolve(__dirname, "views"),
  extname: ".art",
  debug: process.env.NODE_ENV !== "production",
});

//由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上
app.use(bodyParser());
app.use(router.routes());
app.listen(3000);
