const { taskOne, taskTwo } = require("../schedule/index");

class ScheduleController {
  /**
   * @swagger
   * /service-schedule/api/v1/start/task/one:
   *   get:
   *     summary: 启动定时任务1
   *     description: 启动定时任务1
   *     tags:
   *       - schedule
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
  static async startTaskOne(ctx) {
    scheduleTask.taskOne();
    ctx.success("该定时任务启动成功");
  }

  /**
   * @swagger
   * /service-schedule/api/v1/stop/task/one:
   *   get:
   *     summary: 停止定时任务1
   *     description: 停止定时任务1
   *     tags:
   *       - schedule
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
  static async stopTaskOne(ctx) {
    taskOne.cancel();
    ctx.success("该定时任务停止成功");
  }

  /**
   * @swagger
   * /service-schedule/api/v1/start/task/two:
   *   get:
   *     summary: 启动定时任务2
   *     description: 启动定时任务2
   *     tags:
   *       - schedule
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
  static async startTaskTwo(ctx) {
    scheduleTask.taskTwo();
    ctx.success("该定时任务启动成功");
  }

  /**
   * @swagger
   * /service-schedule/api/v1/stop/task/two:
   *   get:
   *     summary: 停止定时任务2
   *     description: 停止定时任务2
   *     tags:
   *       - schedule
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
  static async stoplTaskTwo(ctx) {
    taskTwo.cancel();
    ctx.success("该定时任务停止成功");
  }
}

module.exports = ScheduleController;
