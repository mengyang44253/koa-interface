const connection = require("../config/database");
const dayjs = require("dayjs");

class CommonService {
  //文章总数
  async obtainArticleCount() {
    const statement = `SELECT count(id) as count FROM article`;
    const [res] = await connection.execute(statement);
    return res[0].count;
  }

  //阅读量总数
  async obtainArticleRead() {
    const statement = "SELECT SUM(`reading`) AS num FROM `article`";
    const [res] = await connection.execute(statement);
    return res[0].num;
  }

  //评论总数
  async obtainCommentCount() {
    const statement = `SELECT count(id) as count FROM comment`;
    const [res] = await connection.execute(statement);
    return res[0].count;
  }

  //文章点赞数量
  async obtainArticlePraise() {
    const statement = `SELECT SUM(praise) as num FROM article`;
    const [res] = await connection.execute(statement);
    return res[0].num;
  }
}

module.exports = new CommonService();
