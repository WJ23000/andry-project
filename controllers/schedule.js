const scheduleTask = require("../schedule/index");

class UploadController {
  /**
   * @swagger
   * /service-schedule/api/v1/cancel/taskDemo:
   *   get:
   *     summary: 取消定时任务
   *     description: 取消定时任务
   *     tags:
   *       - upload
   *     operationId: cancelTaskDemo
   *     consumes:
   *       - application/json
   *       - application/xml
   *     produces:
   *       - application/json
   *       - application/xml
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
  static async cancelTaskDemo(ctx) {
    scheduleTask.taskDemo.cancel();
    ctx.success("该定时任务停止成功", result);
  }

  /**
   * @swagger
   * /service-schedule/api/v1/cancel/taskDemo2:
   *   get:
   *     summary: 取消定时任务
   *     description: 取消定时任务
   *     tags:
   *       - upload
   *     operationId: cancelTaskDemo2
   *     consumes:
   *       - application/json
   *       - application/xml
   *     produces:
   *       - application/json
   *       - application/xml
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
   static async cancelTaskDemo2(ctx) {
    scheduleTask.taskDemo2.cancel();
    ctx.success("该定时任务停止成功", result);
  }
}

module.exports = UploadController;
