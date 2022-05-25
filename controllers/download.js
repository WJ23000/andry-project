const path = require("path");
const send = require("koa-send");
class DownloadController {
  /**
   * @swagger
   * /service-download/api/v1/download/file:
   *   get:
   *     summary: 单文件下载
   *     description: 单文件下载
   *     tags:
   *       - download
   *     operationId: downloadFile
   *     consumes:
   *       - application/json
   *       - application/xml
   *     produces:
   *       - application/json
   *       - application/xml
   *     parameters:
   *       - name: name
   *         in: query
   *         type: string
   *         required: true
   *         description: 文件名
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
  static async downloadFile(ctx) {
    const query = ctx.query;
    if (query.name) {
      var fileName = query.name;
      // 设置实体头（表示消息体的附加信息的头字段）,提示浏览器以文件下载的方式打开
      ctx.set("Content-Type", "application/octet-stream");
      ctx.set("Content-Disposition", "attachment;filename=" + fileName);
      const filePath = path.join(__dirname, "../public/images/");
      ctx.attachment(fileName);
      await send(ctx, fileName, { root: filePath });
    } else {
      ctx.exception("文件名必传");
    }
  }

  /**
   * @swagger
   * /service-download/api/v1/download/files:
   *   get:
   *     summary: 多文件下载
   *     description: 多文件下载
   *     tags:
   *       - download
   *     operationId: downloadFiles
   *     consumes:
   *       - application/json
   *       - application/xml
   *     produces:
   *       - application/json
   *       - application/xml
   *     parameters:
   *       - name: file
   *         in: formData
   *         type: file
   *         required: true
   *         description: 多文件下载
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
  static async downloadFiles(ctx) {
    console.log("多文件下载");
  }
}

module.exports = DownloadController;
