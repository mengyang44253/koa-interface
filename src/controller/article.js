const ArticleService=require("../service/article")

class ArticleController{
  async addArticle(ctx, next) {
    const query = ctx.request.body
    const tags=ctx.tags
    const res = await ArticleService.addArticle(query, tags)
    ctx.body = {
      success: true,
      data:res
    };
  }


  async editArticle(ctx, next) {
    const query = ctx.request.body
    const tags=ctx.tags
    const res=await ArticleService.editArticle(query,tags)
    ctx.body = {
      success:true
    }
  }

  async articleList(ctx, next) {
    const query=ctx.request.body
    const res=await ArticleService.getArticleList(query)
    ctx.body = {
      success: true,
      data: res.data,
      count:res.count
    }
  }

  async articleStatus(ctx, next) {
    const query = ctx.request.body
    const res=await ArticleService.changeArticleStatus(query)
    ctx.body = {
      success:true
    }
  }

  async commentStatus(ctx,next) {
    const query = ctx.request.body
    const res=await ArticleService.changeCommentStatus(query)
    ctx.body = {
      success:true
    }
  }

  async getDetailById(ctx, next) {
    const query = ctx.request.query
    const res =await ArticleService.getArticleDetail(query)
    ctx.body = {
      success: true,
      data:res
    }
  }

  async deleteArticle(ctx, next) {
    const query =ctx.request.query
    const res=await ArticleService.deletedArticle(query)
    ctx.body = {
      success:true
    }
  }

  async blogGetDetailById(ctx, next) {
    const query = ctx.request.query
    const res = await ArticleService.blogGetArticleDetailByArticleId(query)
    ctx.body = {
      success: true,
      data: res.data
    }
  }

  async likeSomeArticle(ctx,next) {
    const query = ctx.request.body
    const res = await ArticleService.setPraiseById(query)

    ctx.body = {
      success:true
    }
  }

  async updateArticleRead(ctx, next) {
    const query = ctx.request.body
    const res = await ArticleService.updateReadById(query)
    ctx.body = {
      success:true
    }
  }

  async hotArticle(ctx,next) {
    const query = ctx.request.body
    const res = await ArticleService.hotArticle(query)
    ctx.body = {
      success: true,
      data: res
    }
  }
}


module.exports=new ArticleController()