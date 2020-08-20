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

const router = new Router();

router.get('/',async ctx=>{  
  let list = []
  try {
    list = await model.find();
  } catch (error) {
    console.error(error)
  }
  ctx.render('index', {
    list:list
  })
})

// 留言列表
router.get("/listAll", async (ctx) => {
  let list = []
  try {
    list = await model.find();
  } catch (error) {
    console.error(error)
  }
  ctx.response.body = {
    code:200,
    msg:'success',
    data:{
      list:list
    }
  }
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

// 根据姓名查询留言内容
router.post('/queryNameSearch',async ctx =>{
  const rb = ctx.request.body
  let { name } = rb
  const list = await model.find({name: name});
  console.log('list', list)
  ctx.response.body = {
    data:{
      list:list
    },
    msg:'success',
    code:200
  }
})

module.exports = router;
