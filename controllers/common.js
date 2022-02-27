const CommonModel = require("../modules/common");
const token = require("../utils/token");
const redis = require("../utils/redis");

class CommonController {
  /**
   * @swagger
   * /service-common/api/v1/register:
   *   post:
   *     summary: 注册新用户
   *     description: 注册新用户
   *     tags:
   *       - common
   *     operationId: register
   *     consumes:
   *       - application/json
   *       - application/xml
   *     produces:
   *       - application/json
   *       - application/xml
   *     parameters:
   *       - name: body
   *         in: body
   *         schema:
   *           $ref: '#/definitions/loginRegister'
   *     responses:
   *       4000200:
   *         description: 请求成功
   *       4000500:
   *         description: 请求失败
   *       4000412:
   *         description: 参数异常
   */
  static async register(ctx) {
    const data = ctx.request.body;
    if (data.username && data.password) {
      const isRegisterUser = await CommonModel.isRegisterUser(data);
      if (isRegisterUser) {
        ctx.fail("用户已存在");
        return;
      }
      try {
        const result = await CommonModel.register(data).then((res) => {
          return res.toJSON();
        });
        delete result.password;
        ctx.success("注册成功", result);
      } catch (err) {
        ctx.fail("注册失败", err);
      }
    } else {
      ctx.exception("参数异常，请检查！");
    }
  }

  /**
   * @swagger
   * /service-common/api/v1/login:
   *   post:
   *     summary: 用户登录
   *     description: 用户登录
   *     tags:
   *       - common
   *     operationId: login
   *     consumes:
   *       - application/json
   *       - application/xml
   *     produces:
   *       - application/json
   *       - application/xml
   *     parameters:
   *       - name: body
   *         in: body
   *         schema:
   *           $ref: '#/definitions/loginRegister'
   *     responses:
   *       200:
   *         description: 请求成功
   *       500:
   *         description: 请求失败
   *       412:
   *         description: 参数异常
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
   * @swagger
   * /service-common/api/v1/exit/login:
   *   get:
   *     summary: 退出登录
   *     description: 将传入token移入黑名单
   *     operationId: exitLogin
   *     tags:
   *       - common
   *     responses:
   *       200:
   *         description: 请求成功
   *     security:
   *     - api_key: []
   */
  static async exitLogin(ctx) {
    const oldToken = ctx.request.headers["authorization"];
    if (oldToken) {
      try {
        // 将传入token移入黑名单
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
   * @swagger
   * /service-common/api/v1/update/pwd:
   *   post:
   *     summary: 修改用户密码
   *     description: 修改用户密码
   *     tags:
   *       - common
   *     operationId: updatePwd
   *     consumes:
   *       - application/json
   *       - application/xml
   *     produces:
   *       - application/json
   *       - application/xml
   *     parameters:
   *       - name: body
   *         in: body
   *         schema:
   *           $ref: '#/definitions/updatePassword'
   *     responses:
   *       4000200:
   *         description: 请求成功
   *       4000500:
   *         description: 请求失败
   *       4000412:
   *         description: 参数异常
   */
  static async updatePwd(ctx) {
    const data = ctx.request.body;
    if (data.username && data.password && data.newPassword) {
      const isRegisterUser = await CommonModel.isRegisterUser(data);
      if (!isRegisterUser) {
        ctx.fail("用户不存在");
        return;
      }
      try {
        const result = await CommonModel.updatePwd(data).then((res) => {
          return res.toJSON();
        });
        delete result.password;
        ctx.success("修改密码成功", result);
      } catch (err) {
        ctx.fail("修改密码失败", err);
      }
    } else {
      ctx.exception("参数异常，请检查！");
    }
  }

  /**
   * @swagger
   * /service-common/api/v1/refresh/token:
   *   get:
   *     summary: 刷新token
   *     description: 将传入token移入黑名单并生成新token
   *     tags:
   *       - common
   *     operationId: refreshToken
   *     responses:
   *       200:
   *         description: 请求成功
   *     security:
   *     - api_key: []
   */
  static async refreshToken(ctx) {
    const oldToken = ctx.request.headers["authorization"];
    if (oldToken) {
      try {
        // 将传入token移入黑名单
        await CommonModel.createToken(oldToken);
        // 生成新token
        const user = await token.verify(oldToken);
        const accessToken = await token.sign(user);
        // 存储新token到redis
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

/**
 * @swagger
 * securityDefinitions:
 *   petstore_auth:
 *     type: "oauth2"
 *     authorizationUrl: "http://petstore.swagger.io/oauth/dialog"
 *     flow: "implicit"
 *     scopes:
 *       write:pets: "modify pets in your account"
 *       read:pets: "read your pets"
 *   api_key:
 *     type: "apiKey"
 *     name: "Authorization"
 *     in: "header"
 * definitions:
 *   loginRegister:
 *     properties:
 *       username:
 *         type: "string"
 *         description: 用户名
 *       password:
 *         type: "string"
 *         description: 密码
 *   updatePassword:
 *     properties:
 *       username:
 *         type: "string"
 *         description: 用户名
 *       password:
 *         type: "string"
 *         description: 旧密码
 *       newPassword:
 *         type: "string"
 *         description: 新密码
 */
