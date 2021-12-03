const LabelService=require("../service/label")


class LabelController {
  async addTag(ctx, next) {
    const query = ctx.request.body;
    const res = await LabelService.addTag(query);

    ctx.body = {
      success: true,
      data: res,
    };
  }

  async checkTag(ctx, next) {
    const query = ctx.request.query
    const res = await LabelService.checkTagNameIsExist(query)
    ctx.body = {
      success: true,
      data:res
    };
  }

  async tagList(ctx, next) {
    const query = ctx.request.body
    const res = await LabelService.getTagList(query)
    
    ctx.body = {
      success: true,
      data: res.data,
      count:res.count
    };
  }

  async deleteTag(ctx, next) {
    const query = ctx.request.query
    const res=await LabelService.deletedSomeTag(query)
    ctx.body = {
      success: true,
      data:res
    };
  }

  async addDirectory(ctx, next) {
    const query = ctx.request.body
    const res=await LabelService.addDirectory(query)
    ctx.body = {
      success: true,
      data:res
    };
  }

  async checkDirectory(ctx, next) {
    const query = ctx.request.query
    const res=await LabelService.checkDirectoryName(query)
    ctx.body = {
      success: true,
      data:res
    };
  }

  async directoryList(ctx, next) {
    const query = ctx.request.body
    const res = await LabelService.getDirectoryList(query)
    
    ctx.body = {
      success: true,
      data: res.data,
      count:res.count
    };
  }
  async deletedDirectory(ctx, next) {
    const query = ctx.request.query
    const res=await LabelService.deletedSomeDirectory(query)
    ctx.body = {
      success: true,
      data:res
    };
  }

  async getArticle(ctx, next) {
    const query = ctx.request.body
    const res=await LabelService.getArticleByLabel(query)
    ctx.body = {};
  }

  async articleList(ctx, next) {
    const query = ctx.request.body
    const res = await LabelService.getArticleListByLabelId(query)
    
    ctx.body = {
      success: true,
      data: res.data,
      count:res.count
    }
  }
}

module.exports = new LabelController();
