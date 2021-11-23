const CommentService=require("../service/comment")

class CommentController{
  async list(ctx,next) {
    const query = ctx.request.body
    console.log(query)
    const res = await CommentService.getAdminList(query)
    ctx.body = {
      success: true,
      data: res.data,
      count:res.count
    }
  }

  async blogList(ctx, next) {
    const query = ctx.request.body
    const res=await CommentService.getBlogList(query)
    ctx.body = {
      success: true,
      data: res.data,
      count:res.count
    }
  }

  async add(ctx,next) {
    const query = ctx.request.body
    console.log(query,"11111111111111")
    const res = await CommentService.addComment(query)
    ctx.body = {
      success: true,
      data:res
    }
  }

  async changeStatus(ctx,next) {
    const query = ctx.request.body
    const res = await CommentService.changeCommentStatus(query)
  }
}


module.exports=new CommentController()