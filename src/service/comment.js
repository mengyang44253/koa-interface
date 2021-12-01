const connection = require("../config/database");

const dayjs = require("dayjs");

class CommentService {
  async getAdminList(query) {
    try {
      const { name, pagination, start, limit, start_time, end_time, status } =
        query;
      let statement = `SELECT SQL_CALC_FOUND_ROWS c.id,c.article_id,c.type,c.content,c.from_name,c.from_email,c.from_website,c.to_name,to_email,c.to_website,c.to_id,c.create_time,c.status,JSON_OBJECT("id",a.id,"title",a.title) article_data
    FROM comment c 
    LEFT JOIN article a ON c.article_id = a.id
    GROUP BY c.id HAVING c.create_time BETWEEN ${start_time || 0} AND ${
        end_time || dayjs().unix()
      }`;
      if (name) {
        statement += ` AND from_name LIKE '%${name}%'`;
      }
      if (status) {
        statement += ` AND status=${status}`;
      }
      statement += ` ORDER BY a.create_time DESC`;
      if (pagination === "1") {
        statement += ` LIMIT ${start * limit},${limit}`;
      }
      const [res] = await connection.execute(statement);
      let countSql = `SELECT FOUND_ROWS() count`;
      const [countRes] = await connection.execute(countSql);
      return {
        data: res,
        count: countRes[0].count,
      };
    } catch (error) {
      console.log(error)
    }
  }

  async getBlogList(query) {
    try {
      const { id, start, limit, pagination } = query;
      let statement = `SELECT SQL_CALC_FOUND_ROWS c.id,c.article_id,c.content,c.from_name,c.from_email,c.from_website,c.to_name,to_email,c.to_website,c.to_id,c.create_time,c.status,c.userAgent
    FROM comment c 
    WHERE c.article_id=${id} AND c.create_time BETWEEN ${0} AND ${dayjs().unix()} AND status=2`;
      if (pagination === "1") {
        statement += ` LIMIT ${start * limit},${limit}`;
      }
      const [res] = await connection.execute(statement);
      let countSql = `SELECT FOUND_ROWS() count`;
      const [countRes] = await connection.execute(countSql);
      return {
        data: res,
        count: countRes[0].count,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async addComment(query) {
    try {
      const {
        article_id,
        content,
        type,
        userAgent,
        from_name,
        from_email,
        from_website,
        to_name,
        to_email,
        to_website,
        to_id,
        status,
      } = query;
      let time = dayjs().unix();
      let statement;
      if (to_id) {
        statement = `INSERT INTO comment (article_id,from_name,from_email,from_website,to_name,to_email,to_website,to_id,create_time,status,content,type,userAgent) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
      } else {
        statement = `INSERT INTO comment (article_id,from_name,from_email,from_website,create_time,status,content,type,userAgent) VALUES (?,?,?,?,?,?,?,?,?)`;
      }
      let res;
      if (to_id) {
        res = await connection.execute(statement, [
          article_id,
          from_name,
          from_email,
          from_website,
          to_name,
          to_email,
          to_website,
          to_id,
          time,
          status,
          content,
          type,
          userAgent,
        ]);
      } else {
        res = await connection.execute(statement, [
          article_id,
          from_name,
          from_email,
          from_website,
          time,
          status,
          content,
          type,
          userAgent,
        ]);
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async changeCommentStatus(query) {
    let { id, status } = query
    let statement = `UPDATE comment SET status=${status} WHERE id=${id}`
    let [res] = await connection.execute(statement)
    return res
    
  }

  async deletedComment(query) {
    let { id } = query
    let statement = `DELETE FROM comment WHERE id=${id}`
    const [res] = await connection.execute(statement)
    return res
  }
}

module.exports = new CommentService();
