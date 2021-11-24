const Router = require('koa-router')

const commonRouter = new Router

const {
  countArticle,
  articleRead,
  commentCount,
  articlePraise,
  hotArticle,
  hotComment,
  hotTag,
  friendLink
} =require("../controller/common")

//文章总数
commonRouter.get("/blog/common/countArticle", countArticle)

//文章阅读总量
commonRouter.get("/blog/common/articleRead",articleRead)

//评论总数
commonRouter.get("/blog/common/commentCount",commentCount)

//文章获赞
commonRouter.get("/blog/common/articlePraise", articlePraise)

//热门文章
commonRouter.get("/blog/common/hotArticle", hotArticle)

//最新评论
commonRouter.get("/blog/common/hotComment",hotComment)

//最多tag
commonRouter.get("/blog/comment/hotTag", hotTag)

//友链
commonRouter.get("/blog/common/friendLink",friendLink)




module.exports=commonRouter