const UserModel = require("../modules/user");
class UserController {
  /**
   * 创建单个用户
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async createUser(ctx) {
    const data = ctx.request.body;
    if (data.username && data.password && data.age && data.sex) {
      try {
        // 创建用户
        const result = await UserModel.createUser(data);
        ctx.response.status = 200;
        ctx.success("创建用户成功", result);
      } catch (err) {
        ctx.fail("创建用户失败", err);
      }
    } else {
      ctx.exception("请检查参数是否正确！");
    }
  }

  /**
   * 批量创建用户
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async createUserBatch(ctx) {
    const data = ctx.request.body;
    if (data.length > 0) {
      try {
        const result = await UserModel.createUserBatch(data);
        ctx.success("批量创建用户成功", result);
      } catch (err) {
        ctx.fail("批量创建用户失败", err);
      }
    } else {
      ctx.exception("请检查参数是否正确！");
    }
  }

  /**
   * 查询用户列表
   * @param ctx
   * @param 不传参数默认查所有
   * @returns {Promise.<void>}
   */
  static async getUserList(ctx) {
    const query = ctx.query;
    const pageNum = parseInt(query.pageNum) || 0;
    const pageSize = parseInt(query.pageSize) || 0;
    try {
      const offset = (pageNum - 1) * pageSize;
      const limit = pageSize;
      const result = await UserModel.getUserList(offset, limit);
      ctx.success("查询成功", result);
    } catch (err) {
      ctx.fail("查询失败", err);
    }
  }

  /**
   * 根据id编辑单个用户
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async updateUser(ctx) {
    const data = ctx.request.body;
    if (data.id && data.username && data.password && data.age && data.sex) {
      try {
        const result = await UserModel.updateUser(data);
        ctx.success("编辑用户成功", result);
      } catch (err) {
        ctx.fail("编辑用户失败", err);
      }
    } else {
      ctx.exception("请检查参数是否正确！");
    }
  }

  /**
   * 批量编辑用户
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async updateUserBatch(ctx) {
    const data = ctx.request.body;
    if (data.length > 0) {
      try {
        const result = await UserModel.updateUserBatch(data);
        ctx.success("批量编辑用户成功", result);
      } catch (err) {
        ctx.fail("批量编辑用户失败", err);
      }
    } else {
      ctx.exception("请检查参数是否正确！");
    }
  }

  /**
   * 根据id数组批量删除用户
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async deleteUser(ctx) {
    const data = ctx.request.body;
    if (data.length > 0) {
      try {
        const result = await UserModel.deleteUser(data);
        if (result > 0) {
          ctx.success("删除成功", result);
        } else {
          ctx.fail("要删除的数据不存在！", result);
        }
      } catch (err) {
        ctx.fail("删除失败", err);
      }
    } else {
      ctx.exception("请检查参数是否正确！");
    }
  }

  /**
   * 根据id查询用户详情
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async getUserDetail(ctx) {
    const query = ctx.query;
    if (query.id) {
      try {
        const result = await UserModel.getUserDetail(query.id);
        ctx.success("查询成功", result);
      } catch (err) {
        ctx.fail("查询失败", err);
      }
    } else {
      ctx.exception("用户id必传！");
    }
  }
}

module.exports = UserController;
