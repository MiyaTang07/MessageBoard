// 路由
const Router = require("koa-router");
const url = require("url");

// 数据库
const mongoose = require('mongoose')
const dbConfig = require('./db/config.js')
const model = require('./db/model')

// 连接数据库
mongoose.connect(dbConfig.db, {
  useUnifiedTopology:true, 
  useNewUrlParser:true
})

// 时间格式化库
const moment = require("moment");
const { reverse } = require("dns");

const router = new Router();

// let msgList = [
//   { name: "miya", content: "hello world!", create_at: "2020-08-17 08:08:08" },
// ];

// 留言列表
router.get("/", async (ctx) => {
  let list = []
  try {
    list = await model.find();
    // console.log('res', list)
  } catch (error) {
    console.error(error)
  }
  await ctx.render("index", {
    msgList: list,
  });
});

// 新增留言页面
router.get("/add", async (ctx) => {
  await ctx.render("add")
});


// 新增留言API
router.get("/doAdd", async (ctx) => {
  const params = ctx.request.query;
  let current_time = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  var msg = {
    id: new Date().getTime() + Math.floor((Math.random()*1000)+1),
    name: params.name,
    content: params.content,
    create_at: current_time,
  };
  await model(msg).save()
  ctx.response.redirect("/");
});

// 删除留言API
router.post('/delete', async (ctx, next) =>{
    const rb = ctx.request.body
    let { id } = rb
    typeof id ===  'string' && await model.remove({ id });
    ctx.response.body = {
        msg:'success',
        code:200
    }
})

module.exports = router;
