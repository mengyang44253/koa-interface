const Router = require('koa-router')

const commonRouter = new Router

const {
  countArticle,
  articleRead,
  commentCount,
  articlePraise
} =require("../controller/common")

//文章总数
commonRouter.get("/blog/common/countArticle", countArticle)

//文章阅读总量
commonRouter.get("/blog/common/articleRead",articleRead)

//评论总数
commonRouter.get("/blog/common/commentCount",commentCount)

//文章获赞
commonRouter.get("/blog/common/articlePraise",articlePraise)




module.exports=commonRouter