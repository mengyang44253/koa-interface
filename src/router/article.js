
const Router=require('koa-router')

const articleRouter = new Router()

const {
  addArticle,
  editArticle,
  articleList,
  articleStatus,
  commentStatus,
  getDetailById,
  deleteArticle,
  likeSomeArticle,
  updateArticleRead,
  hotArticle
} = require('../controller/article')

const {
  verifyLabelExists,
  verifyDeleteArticleLabel
} =require('../middleware/article') 

//添加文章
articleRouter.post("/admin/article/addArticle",verifyLabelExists, addArticle)

//修改文章
articleRouter.post("/admin/article/editArticle",verifyLabelExists, editArticle)

//文章列表
articleRouter.post("/admin/article/articleList", articleList)

//修改文章的状态
articleRouter.post("/admin/article/articleStatus", articleStatus)

//文章评论状态
articleRouter.post("/admin/article/commentStatus",commentStatus)

//根据文章id获取文章详情
articleRouter.get("/admin/article/getDetailById", getDetailById)

//删除某一篇文章
articleRouter.get("/admin/article/deleteArticle", deleteArticle)

//前台点赞某一篇文章
articleRouter.post("/blog/article/likeSomeArticle", likeSomeArticle)

//前台阅读量更新
articleRouter.post("/blog/article/updateArticleRead", updateArticleRead)

//前台热门文章
articleRouter.post("/blog/article/hotArticle",hotArticle)




module.exports = articleRouter