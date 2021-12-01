const CommonService = require("../service/common")

class CommonController{
  async countArticle(ctx,next) {
    const query = ctx.request.query
    const res = await CommonService.obtainArticleCount()
    ctx.body = {
      success: true,
      data:res
    }
  }

  async articleRead(ctx, next) {
    const query = ctx.request.query
    const res = await CommonService.obtainArticleRead()
    ctx.body = {
      success: true,
      data:res
    }
  }

  async commentCount(ctx,next) {
    const query = ctx.request.query
    const res = await CommonService.obtainCommentCount()
    ctx.body = {
      success: true,
      data:res
    }
  }

  async articlePraise(ctx,next) {
    const query = ctx.request.query
    const res = await CommonService.obtainArticlePraise()
    ctx.body = {
      success: true,
      data:res
    }
  }

  async hotArticle(ctx, next) {
    const query = ctx.request.query
    let res = await CommonService.getHotArticle(query)
    ctx.body = {
      success: true,
      data:res
    }
  }

  async hotComment(ctx,next) {
    const query = ctx.request.query
    let res=await CommonService.getHtoComment(query)
    ctx.body = {
      success: true,
      data:res
    }
  }

  async hotTag(ctx,next) {
    const query = ctx.request.query
    let res=await CommonService.getHotTag(query)
    ctx.body = {
      success: true,
      data:res
    }
  }

  async friendLink(ctx,next) {
    const query = ctx.request.query
    let res = await CommonService.getFriendLink(query)
    ctx.body = {
      success: true,
      data:res
    }
  }
}



module.exports=new CommonController()