const CommonModel = require("../modules/common");
const token = require("../utils/token");
const redis = require("../utils/redis");

class CommonController {
  /**
   * 注册
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async register(ctx) {
    const data = ctx.request.body;
    if (data.username && data.password) {
      try {
        const result = await CommonModel.register(data);
        ctx.success("注册成功", result);
      } catch (err) {
        ctx.fail("注册失败", err);
      }
    } else {
      ctx.exception("请检查用户名或密码是否输入！");
    }
  }

  /**
   * 登录
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async login(ctx) {
    const data = ctx.request.body;
    if (data.username && data.password) {
      try {
        const user = await CommonModel.login(data);
        // 存储token到redis之前将已存在的token移入黑名单
        const oldToken = await redis.get(data.username);
        if (oldToken) {
          await CommonModel.createToken("Bearer " + oldToken);
        }
        // 生成新token
        const accessToken = await token.sign(user);
        await redis.set(data.username, accessToken);
        const result = {
          token: accessToken,
          data: user,
        };
        ctx.success("查询成功", result);
      } catch (err) {
        ctx.fail("登录失败", err);
      }
    } else {
      ctx.exception("请检查用户名或密码是否正确！");
    }
  }

  /**
   * 退出登录（将传入的token移入黑名单）
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async exitLogin(ctx) {
    const oldToken = ctx.request.headers["authorization"];
    if (oldToken) {
      try {
        // 将传入的token移入黑名单
        await CommonModel.createToken(oldToken);
        ctx.success("退出登录成功", "");
      } catch (err) {
        ctx.fail("退出登录失败", err);
      }
    } else {
      ctx.exception("请检查headers是否设置authorization");
    }
  }

  /**
   * 刷新token（将传入的token移入黑名单并生成新token）
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async refreshToken(ctx) {
    const oldToken = ctx.request.headers["authorization"];
    if (oldToken) {
      try {
        // 将传入的token移入黑名单
        await CommonModel.createToken(oldToken);
        // 生成新的token
        const user = await token.verify(oldToken);
        const accessToken = await token.sign(user);
        // 存储新的token到redis
        redis.set(user.username, accessToken);
        ctx.success("刷新成功", accessToken);
      } catch (err) {
        ctx.fail("刷新失败", err);
      }
    } else {
      ctx.exception("请检查headers是否设置authorization");
    }
  }
}

module.exports = CommonController;
