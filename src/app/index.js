const Koa=require('koa')
const bodyParser=require('koa-bodyparser')

const myRoutes=require('../router')

const errorHandle=require('../global/error')

const app=new Koa()
app.use(bodyParser());

myRoutes(app)

app.on('error',errorHandle)

module.exports = app