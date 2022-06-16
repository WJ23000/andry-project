const fs = require("fs");
const path = require("path");
const send = require("koa-send");
const archiver = require("archiver");
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
   *       - name: fileName
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
    if (query.fileName) {
      const fileName = query.fileName;
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
   *   post:
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
   *       - name: fileNameList
   *         in: body
   *         required: true
   *         schema:
   *           type: array
   *           items:
   *             $ref: ''
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
    // 字符串转对象
    const fileNameList = eval(ctx.request.body);
    if (fileNameList.length > 0) {
      // 创建可写流来写入数据，将压缩包保存到当前项目的目录下，并且压缩包名为test.zip
      const writeFilePath = path.join(__dirname, "../public/download/");
      const readFilePath = path.join(__dirname, "../public/images/");
      const output = fs.createWriteStream(writeFilePath + "test.zip");
      // 设置压缩等级
      const archive = archiver("zip", { zlib: { level: 9 } });
      // 建立管道连接
      archive.pipe(output);
      // 压缩指定文件
      fileNameList.forEach((item) => {
        // 读取当前目录下的文件
        const stream = fs.createReadStream(readFilePath + item);
        archive.append(stream, { name: item });
      });
      // 第五步，完成压缩
      archive.finalize();
      ctx.success("查询成功", result);
    } else {
      ctx.exception("文件名必传");
    }
  }
}

module.exports = DownloadController;
