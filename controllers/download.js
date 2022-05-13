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
   *       - name: file
   *         in: formData
   *         type: file
   *         required: true
   *         description: 单文件下载
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
    console.log("单文件下载");
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
