const { DataTypes, Op, where } = require("sequelize");
// 引入mysql的配置文件
const db = require("../config/db");
// 引入sequelize对象
const sequelize = db.sequelize;
// 引入数据表模型
const user = require("../schema/user")(sequelize, DataTypes);
// 自动创建表(true：是，false：否)
// user.sync({ force: false });

class UserModel {
  /**
   * 创建单个用户
   * @param data
   * @returns {Promise<*>}
   */
  static async createUser(data) {
    return await user.create({
      username: data.username,
      password: data.password,
      age: data.age,
      sex: data.sex,
    });
  }

  /**
   * 批量创建用户
   * @param data
   * @returns {Promise<*>}
   */
  static async createUserBatch(data) {
    return await user.bulkCreate(data);
  }

  /**
   * 查询用户列表
   * @param offset
   * @param limit
   * @returns {Promise<Model>}
   */
  static async getUserList(offset, limit) {
    if (offset == 0 && limit == 0) {
      return await user.findAll({});
    } else {
      return await user.findAll({
        offset,
        limit,
      });
    }
  }

  /**
   * 根据id编辑单个用户
   * @param data
   * @returns {Promise<*>}
   */
  static async updateUser(data) {
    return await user.update(
      {
        username: data.username,
        password: data.password,
        age: data.age,
        sex: data.sex,
      },
      {
        where: {
          id: data.id,
        },
      }
    );
  }

  /**
   * 批量编辑用户
   * @param data
   * @returns {Promise<*>}
   */
  static async updateUserBatch(data) {
    return await user.bulkCreate(data, {
      validate: true,
      updateOnDuplicate: ["username", "password", "age", "sex"],
    });
  }

  /**
   * 根据id数组批量删除用户
   * @param ids
   * @returns {Promise<Model>}
   */
  static async deleteUser(ids) {
    return await user.destroy({
      where: {
        id: { [Op.in]: ids },
      },
    });
  }

  /**
   * 根据id查询用户详情
   * @param id
   * @returns {Promise<Model>}
   */
  static async getUserDetail(id) {
    return await user.findOne({
      where: {
        id,
      },
    });
  }
}

module.exports = UserModel;
