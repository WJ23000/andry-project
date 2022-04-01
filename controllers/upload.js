const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const uploadToQiniu = require("../utils/qiniu");

class UploadController {
  /**
   * @swagger
   * /service-upload/api/v1/upload/file:
   *   post:
   *     summary: 单文件上传
   *     description: 单文件上传
   *     tags:
   *       - upload
   *     operationId: uploadFile
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
   *         description: 单文件上传
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
  static async uploadFile(ctx) {
    // 获取上传文件
    const file = ctx.request.files.file;
    // 生成唯一的命名
    const onlyName = uuid.v1();
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // 获取上传文件扩展名生成文件名
    const suffix = file.name.split(".").pop();
    const fileName = `${onlyName}.${suffix}`;
    let filePath = path.join(__dirname, "../public/upload/") + `/${fileName}`;
    // 创建可写流
    const writeStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(writeStream);
    // 上传到七牛云
    const result = await uploadToQiniu(reader, fileName);
    ctx.success("上传成功", result);
  }

  /**
   * @swagger
   * /service-upload/api/v1/upload/files:
   *   post:
   *     summary: 多文件上传
   *     description: 多文件上传
   *     tags:
   *       - upload
   *     operationId: uploadFiles
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
   *         description: 多文件上传
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
  static async uploadFiles(ctx) {
    // 获取上传文件
    const files = ctx.request.files.file;
    for (let file of files) {
      // 生成唯一的命名
      const onlyName = uuid.v1();
      // 创建可读流
      const reader = fs.createReadStream(file.path);
      // 获取上传文件扩展名生成文件名
      const suffix = file.name.split(".").pop();
      const fileName = `${onlyName}.${suffix}`;
      // 获取上传文件扩展名
      let filePath = path.join(__dirname, "../public/upload/") + `/${fileName}`;
      // 创建可写流
      const writeStream = fs.createWriteStream(filePath);
      // 可读流通过管道写入可写流
      reader.pipe(writeStream);
      // 上传到七牛云
      await uploadToQiniu(reader, fileName);
    }
    ctx.success("上传成功");
  }
}

module.exports = UploadController;
