const LabelService = require("../service/label");
const ArticleService=require("../service/article")

//tag是否是新增的
const verifyLabelExists = async (ctx, next) => {
  const { tag } = ctx.request.body;
  let tags = [];
  if (tag) {
    let arrTag = tag.split(",");
    for (let item of arrTag) {
      let num = Number(item)
      if (isNaN(num)) {
        let res = await LabelService.addTag({
          type: 1,
          name:item
        })
        tags.push(res.insertId)
      } else {
        tags.push(num)
      }
    }
  }

  ctx.tags = tags
  await next();
};

//修改文章的时候先删除掉所有的article_label
const verifyDeleteArticleLabel = async (ctx,next) => {
  try {
    const { id } = ctx.request.body
  const res=await ArticleService.deleteArticleLabel(id)
  await next()
  } catch (error) {
  }
}

module.exports = {
  verifyLabelExists,
  verifyDeleteArticleLabel
};
