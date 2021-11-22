const connection = require("../config/database");
const dayjs = require("dayjs");

class FriendService {
  async createFriend(query) {
    const { name, img, website, status } = query;
    const time=dayjs().unix()
    const statement = `INSERT INTO friend (name,img,website,status,create_time,update_time) VALUES (?,?,?,?,?,?)`;
    const [res] = await connection.execute(statement, [
      name,
      img,
      website,
      status,
      time,
      time
    ]);
    return res;
  }

  async friendList(query) {
    try {
      const { start_time, end_time, start, limit, pagination, name } = query;
      let statement = `SELECT SQL_CALC_FOUND_ROWS id,name,img,website,status FROM friend WHERE create_time BETWEEN ${
        start_time || 0
      } AND ${end_time || dayjs().unix()}`;
      if (name) {
        statement += ` AND name LIKE '%${name}%'`;
      }
      statement += ` ORDER BY create_time DESC`;
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
    }
  }

  async editFriend(query) {
    const { id, name, img, website, status } = query;
    const statement = `UPDATE friend SET status=${status},name='${name}',img='${img}',website='${website}' WHERE id=${id}`;
    const [res] = await connection.execute(statement);
    return res;
  }

  async editStatus(query) {
    const { id, status } = query;
    const statement = `UPDATE friend SET status=${status} WHERE id=${id}`;
    const [res] = await connection.execute(statement);
    return res;
  }

  async deletedFriend(query) {
    try {
      const { id } = query;
    const statement = `DELETE FROM friend WHERE id=${id}`;
    const [res] = await connection.execute(statement);

    return res;
    } catch (error) {
    }
    
  }
}

module.exports = new FriendService();
