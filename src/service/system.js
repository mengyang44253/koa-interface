const connection = require("../config/database");
const dayjs = require("dayjs");

class SystemService {
  async addRole(query) {
    try {
      const { name, desc } = query;
      const time = dayjs().unix();
      const statement =
        "INSERT INTO role (name,create_time,update_time,`desc`) VALUES(?,?,?,?)";
      const [res] = await connection.execute(statement, [
        name,
        time,
        time,
        desc,
      ]);
      let authSql = `INSERT INTO auth (role_id,name) VALUES (${res.insertId},null)`;
      const authRes = connection.execute(authSql);
      return res;
    } catch (error) {
      return error.errno;
    }
  }
  async roleList(query) {
    const { pagination, start, limit, name, start_time, end_time } = query;
    let statement = `
    SELECT SQL_CALC_FOUND_ROWS r.id,r.name,r.desc,r.create_time,r.update_time
    FROM role r
    GROUP BY r.id HAVING r.update_time BETWEEN ${start_time || 0} AND ${
      end_time || dayjs().unix()
    }
    `;
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
  }

  async editRole(query) {
    try {
      const { id, name, desc } = query;
      const time = dayjs().unix();
      const statement =
        "UPDATE role SET name=?,`desc`=?,update_time=? WHERE id=?";
      const [res] = await connection.execute(statement, [name, desc, time, id]);
      return res;
    } catch (error) {
    }
  }

  async deletedRole(id) {
    try {
      const statement = `DELETE FROM role WHERE id=?`;
      const [res] = await connection.execute(statement, [id]);
      return res;
    } catch (error) {
    }
  }

  async editAuth(query) {
    const { role_id, name } = query;
    let statement = `UPDATE auth SET name='${name}' WHERE role_id=${role_id}`;
    const [res] = await connection.execute(statement);
    return res;
  }
  async getAuth(query) {
    const { role_id } = query;
    const statement = `SELECT name FROM auth WHERE role_id=${role_id}`;
    const [res] = await connection.execute(statement);
    return res[0].name;
  }

  async userList(query) {
    try {
      const { start_time, end_time, start, limit, pagination, name } = query;
      let statement = `
    SELECT SQL_CALC_FOUND_ROWS u.user_id,u.name,u.create_time,u.update_time,u.avatar,u.phone,u.gender,u.birth,u.country,u.city,u.create_address,u.last_login_address,u.role_id,u.last_login_time,r.name AS roleName
    FROM user u
    LEFT JOIN role r ON u.role_id =r.id
    GROUP BY u.user_id,u.name,u.create_time,u.update_time,u.avatar,u.phone,u.gender,u.birth,u.country,u.city,u.create_address,u.last_login_address,u.role_id,u.last_login_time ,r.name HAVING last_login_time BETWEEN ${
      start_time || 0
    } AND ${end_time || dayjs().unix()}
    `;
      if (name) {
        statement += ` AND name LIKE '%${name}%'`;
      }
      statement += ` ORDER BY last_login_time DESC`;
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

  async userEditAuth(query) {
    try {
      const { user_id, name, role_id } = query;
      const statement = `UPDATE user SET name='${name}',role_id=${role_id} WHERE user_id=${user_id}`;
      const [res] = await connection.execute(statement);
      return res;
    } catch (error) {
    }
  }

  async deletedSomeUser(query) {
    const { user_id } = query;
    const statement = `DELETE FROM login WHERE id=${user_id}`
    const [res] = await connection.execute(statement)
    return res
  }
}

module.exports = new SystemService();
