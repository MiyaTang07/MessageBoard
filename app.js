const koa = require('koa')
const Router = require('koa-router')
const render = require('koa-art-template')
// 静态资源设置模块
const static = require('koa-static');
const path = require('path')
const moment = require('moment');
const url = require('url')
const querystring = require('querystring');

const app = new koa()
const router = new Router()

app.use(static(path.join(__dirname, '/public')))

// 设置模板引擎
render(app, {
    root:path.resolve(__dirname, 'views'),
    extname:'.art',
    debug: process.env.NODE_ENV !== 'production'
})

let msgList = [{name:'miya',content:'hello world!', create_at:'20200808'}];
router.get('/',async ctx=>{
    await ctx.render('index',{
        msgList:msgList
    })
})
router.get('/add', async ctx=>[
    await ctx.render('add')
])
router.get('/doAdd',async ctx=>{
    const queryStr = url.parse(ctx.request.url).query
    const params = querystring.parse(queryStr)
    // console.log('params', params) 
    let current_time =  moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    var msg={name:params.name,content:params.content,create_at:current_time};
    msgList.push(msg);
    ctx.response.redirect('/');
})

app.use(router.routes())

app.listen(3000)