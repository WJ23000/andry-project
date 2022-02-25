const { DataTypes, Op, where } = require("sequelize");
// 引入mysql的配置文件
const db = require("../config/db");
// 引入sequelize对象
const sequelize = db.sequelize;
// 引入数据表模型
const user = require("../schema/user")(sequelize, DataTypes);
const token_blacklist = require("../schema/token_blacklist")(
  sequelize,
  DataTypes
);
// 自动创建表(true：是，false：否)
// user.sync({ force: false });

class CommonModel {
  /**
   * 注册
   * @param data
   * @returns {Promise<Model>}
   */
  static async register(data) {
    return await user.create({
      username: data.username,
      password: data.password,
    });
  }

  /**
   * 注册(检查用户是否存在)
   * @param data
   * @returns {Promise<Model>}
   */
  static async isRegisterUser(data) {
    return await user.findOne({
      where: {
        username: data.username,
      },
    });
  }

  /**
   * 登录
   * @param username
   * @returns {Promise<Model>}
   */
  static async login(data) {
    return await user.findOne({
      where: {
        username: data.username,
        password: data.password,
      },
    });
  }

  /**
   * 将token移入黑名单
   * @param token
   * @returns {Promise<Model>}
   */
  static async createToken(token) {
    return await token_blacklist.create({
      token,
    });
  }

  /**
   * 查询token是否在黑名单中
   * @param token
   * @returns {Promise<Model>}
   */
  static async queryToken(token) {
    return await token_blacklist.findOne({
      where: {
        token,
      },
    });
  }
}

module.exports = CommonModel;
