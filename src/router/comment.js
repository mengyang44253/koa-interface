const Router = require("koa-router")


const commentRouter = new Router()



const { 
  list,
  blogList,
  add,
  changeStatus,
  deleted
} = require("../controller/comment")



//评论列表
commentRouter.post("/admin/comment/list", list)

//前台某个文章的评论
commentRouter.post("/blog/comment/list", blogList)

//添加评论
commentRouter.post("/blog/comment/add", add)

//后台修改评论状态
commentRouter.post("/admin/comment/status", changeStatus)

//删除一条数据
commentRouter.post("/admin/comment/deleted",deleted)



module.exports=commentRouter