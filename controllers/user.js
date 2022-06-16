const bcryptjs = require("bcryptjs");
const CommonModel = require("../modules/common");
const UserModel = require("../modules/user");
class UserController {
  /**
   * @swagger
   * /service-user/api/v1/create:
   *   post:
   *     summary: 创建用户
   *     description: 创建用户
   *     tags:
   *       - user
   *     operationId: create
   *     consumes:
   *       - application/json
   *       - application/xml
   *     produces:
   *       - application/json
   *       - application/xml
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/user'
   *     responses:
   *       4000200:
   *         description: 请求成功
   *       4000500:
   *         description: 请求失败
   *       4000412:
   *         description: 参数异常
   *     security:
   *     - api_key: []
   */
  static async createUser(ctx) {
    const data = ctx.request.body;
    if ((data.username && data.password) || data.age || data.sex) {
      const isRegisterUser = await CommonModel.isRegisterUser(data);
      if (isRegisterUser) {
        ctx.exception("用户已存在");
        return;
      }
      // 密码加密
      data.password = bcryptjs.hashSync(data.password, 10);
      try {
        // 创建用户
        const result = await UserModel.createUser(data);
        delete result.password; // 不生效待处理
        ctx.success("创建用户成功", result);
      } catch (err) {
        ctx.fail("创建用户失败", err);
      }
    } else {
      ctx.exception("请检查参数是否正确");
    }
  }

  /**
   * @swagger
   * /service-user/api/v1/create/batch:
   *   post:
   *     summary: 批量创建用户
   *     description: 批量创建用户
   *     tags:
   *       - user
   *     operationId: createUserBatch
   *     consumes:
   *       - application/json
   *       - application/xml
   *     produces:
   *       - application/json
   *       - application/xml
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/user'
   *     responses:
   *       4000200:
   *         description: 请求成功
   *       4000500:
   *         description: 请求失败
   *       4000412:
   *         description: 参数异常
   *     security:
   *     - api_key: []
   */
  static async createUserBatch(ctx) {
    const data = ctx.request.body;
    if (data.length > 0) {
      try {
        data.forEach(async (item) => {
          console.log("触发了么", item);
          const isRegisterUser = await CommonModel.isRegisterUser(item);
          if (isRegisterUser) {
            ctx.exception("用户已存在");
            return;
          }
        });
        data.forEach((item) => {
          // 密码加密
          item.password = bcryptjs.hashSync(item.password, 10);
        });
        const result = await UserModel.createUserBatch(data);
        ctx.success("批量创建用户成功", result);
      } catch (err) {
        ctx.fail("批量创建用户失败", err);
      }
    } else {
      ctx.exception("请检查参数是否正确");
    }
  }

  /**
   * @swagger
   * /service-user/api/v1/query/list:
   *   get:
   *     summary: 查询用户列表
   *     description: 查询用户列表
   *     tags:
   *       - user
   *     operationId: getUserList
   *     consumes:
   *       - application/json
   *       - application/xml
   *     produces:
   *       - application/json
   *       - application/xml
   *     parameters:
   *       - name: pageNum
   *         in: query
   *         type: number
   *         required: false
   *         description: 页面页码
   *       - name: pageSize
   *         in: query
   *         type: number
   *         required: false
   *         description: 页面数量
   *     responses:
   *       4000200:
   *         description: 请求成功
   *       4000500:
   *         description: 请求失败
   *       4000412:
   *         description: 参数异常
   *     security:
   *     - api_key: []
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
   * @swagger
   * /service-user/api/v1/update:
   *   post:
   *     summary: 根据id编辑用户
   *     description: 根据id编辑用户
   *     tags:
   *       - user
   *     operationId: updateUser
   *     consumes:
   *       - application/json
   *       - application/xml
   *     produces:
   *       - application/json
   *       - application/xml
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/user'
   *     responses:
   *       4000200:
   *         description: 请求成功
   *       4000500:
   *         description: 请求失败
   *       4000412:
   *         description: 参数异常
   *     security:
   *     - api_key: []
   */
  static async updateUser(ctx) {
    const data = ctx.request.body;
    if ((data.id && data.username && data.password) || data.age || data.sex) {
      try {
        const result = await UserModel.updateUser(data);
        ctx.success("编辑用户成功", result);
      } catch (err) {
        ctx.fail("编辑用户失败", err);
      }
    } else {
      ctx.exception("请检查参数是否正确");
    }
  }

  /**
   * @swagger
   * /service-user/api/v1/update/batch:
   *   post:
   *     summary: 批量编辑用户
   *     description: 批量编辑用户
   *     tags:
   *       - user
   *     operationId: updateUserBatch
   *     consumes:
   *       - application/json
   *       - application/xml
   *     produces:
   *       - application/json
   *       - application/xml
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/user'
   *     responses:
   *       4000200:
   *         description: 请求成功
   *       4000500:
   *         description: 请求失败
   *       4000412:
   *         description: 参数异常
   *     security:
   *     - api_key: []
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
      ctx.exception("请检查参数是否正确");
    }
  }

  /**
   * @swagger
   * /service-user/api/v1/delete/batch:
   *   post:
   *     summary: 根据id数组批量删除用户
   *     description: 根据id数组批量删除用户
   *     tags:
   *       - user
   *     operationId: deleteUserBatch
   *     consumes:
   *       - application/json
   *       - application/xml
   *     produces:
   *       - application/json
   *       - application/xml
   *     parameters:
   *       - name: ids
   *         in: body
   *         required: true
   *         schema:
   *           type: array
   *           items:
   *              $ref: ''
   *     responses:
   *       4000200:
   *         description: 请求成功
   *       4000500:
   *         description: 请求失败
   *       4000412:
   *         description: 参数异常
   *     security:
   *     - api_key: []
   */
  static async deleteUserBatch(ctx) {
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
      ctx.exception("请检查参数是否正确");
    }
  }

  /**
   * @swagger
   * /service-user/api/v1/query/detail:
   *   get:
   *     summary: 根据id查询用户详情
   *     description: 根据id查询用户详情
   *     tags:
   *       - user
   *     operationId: getUserDetail
   *     consumes:
   *       - application/json
   *       - application/xml
   *     produces:
   *       - application/json
   *       - application/xml
   *     parameters:
   *       - name: id
   *         in: query
   *         type: string
   *         required: true
   *         description: 用户id
   *     responses:
   *       4000200:
   *         description: 请求成功
   *       4000500:
   *         description: 请求失败
   *       4000412:
   *         description: 参数异常
   *     security:
   *     - api_key: []
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
      ctx.exception("用户id必传");
    }
  }
}

module.exports = UserController;

/**
 * @swagger
 * definitions:
 *   user:
 *     properties:
 *       username:
 *         type: string
 *         description: 用户名
 *       password:
 *         type: string
 *         description: 密码
 *       age:
 *         type: string
 *         description: 年龄
 *       sex:
 *         type: string
 *         description: 性别
 *   pagination:
 *     properties:
 *       pageNum:
 *         type: number
 *         description: 页面页码
 *       pageSize:
 *         type: number
 *         description: 页面数量
 */
