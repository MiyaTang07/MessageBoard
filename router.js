// 路由
const Router = require("koa-router");
const url = require("url");

// 时间格式化库
const moment = require("moment");

const router = new Router();

let msgList = [
  { name: "miya", content: "hello world!", create_at: "2020-08-17 08:08:08" },
];

// 留言列表
router.get("/", async (ctx) => {
  await ctx.render("index", {
    msgList: msgList,
  });
});

// 新增留言页面
router.get("/add", async (ctx) => [await ctx.render("add")]);


// 新增留言API
router.get("/doAdd", async (ctx) => {
  const params = ctx.request.query;
  let current_time = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  var msg = {
    name: params.name,
    content: params.content,
    create_at: current_time,
  };
  msgList.push(msg);
  // ctx.body = { msg: "success", code: 200 };
  ctx.response.redirect("/");
});

// 删除留言API
router.post('/delete', async (ctx, next) =>{
    const rb = ctx.request.body
    if(rb && rb.id){
        msgList.splice(rb.id, 1)
    }
    console.log('msgList', msgList)
    ctx.response.body = {
        msg:'success',
        code:200
    }
})

module.exports = router;
