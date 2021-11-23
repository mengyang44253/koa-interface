const connection = require("../config/database");

const dayjs = require("dayjs");

class UserService {
  //注册
  async register(name, password, address) {
    try {
      let time = dayjs().unix();
      const loginStatement = `INSERT INTO login (account,password) VALUES(?,?)`;
      const userStatement = `INSERT INTO user (name,create_time,update_time,create_address,last_login_time,last_login_address,user_id) VALUES(?,?,?,?,?,?,?)`;
      const result = await connection.execute(loginStatement, [name, password]);
      let user_id = result[0].insertId;
      const [res] = await connection.execute(userStatement, [
        name,
        time,
        time,
        address,
        time,
        address,
        user_id,
      ]);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  //用户名是否重复
  async getUserByName(name) {
    const statement = `SELECT * from login WHERE account =?`;
    const [res] = await connection.execute(statement, [name]);
    return res;
  }

  //更新用户登陆地
  async updateUserInfo(user_id, time, address) {
    const statement = `UPDATE user SET last_login_address=?,last_login_time=? WHERE user_id=?`;
    const [res] = await connection.execute(statement, [address, time, user_id]);
    return res;
  }

  //获取用户信息
  async getUserInfoById(id) {
    const statement = `SELECT * FROM user WHERE user_id=?`;
    const [res] = await connection.execute(statement, [id]);
    return res[0];
  }
  //更新用户信息
  async changeUserInfo(query) {
    const { name, avatar, birth, phone, country, city, gender, id } = query;
    let statement = `UPDATE user SET name='${name}'`;
    if (avatar) {
      statement += `,avatar='${avatar}'`;
    }
    if (birth) {
      statement += `,birth=${birth}`;
    }
    if (phone) {
      statement += `,phone=${phone}`;
    }
    if (country) {
      statement += `,country=${country}`;
    }
    if (city) {
      statement += `,city=${Number(city)}`;
    }
    if (gender) {
      statement += `,gender=${Number(gender)}`;
    }
    statement += ` WHERE user_id =${id}`;
    const [res] = await connection.execute(statement);
    return res;
  }
  //密码是否正确
  async checkPassword(user_id) {
    const statement = `SELECT * FROM login WHERE id=?`;
    const [res] = await connection.execute(statement, [user_id]).log(res);
    return res[0];
  }
  //更新密码
  async changePassword(user_id, password) {
    try {
      const statement = `UPDATE login SET password='${password}' WHERE id=${user_id} `;
      const [res] = await connection.execute(statement);
      return res;
    } catch (error) {}
  }
}

module.exports = new UserService();
