const fs = require("fs");
const path = require("path");
const xlsx = require("node-xlsx");
const template = require("../model/template");
const validate = require("../utils/validate");

class TemplateController {
  /**
   * @swagger
   * /service-template/api/v1/export/template:
   *   get:
   *     summary: 导出模板
   *     description: 导出模板
   *     tags:
   *       - template
   *     operationId: exportTemplate
   *     consumes:
   *       - application/json
   *       - application/xml
   *     produces:
   *       - application/json
   *       - application/xml
   *     parameters:
   *       - name: type
   *         in: query
   *         type: string
   *         required: true
   *         description: 模板类型
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
  static async exportTemplate(ctx) {
    const query = ctx.query;
    if (query.type) {
      const templateInfo = template[query.type];
      console.log("dddd", templateInfo);
      if (templateInfo) {
        const config = [
          {
            name: templateInfo.name,
            data: [["test", "1234567"]], // 数据来源于数据库(二维数组结构)
          },
        ];
        // 设置title
        config[0].data.unshift(templateInfo.title);
        // 由于各列数据长度不同，可以设置一下列宽
        const options = {
          "!cols": templateInfo.width,
        };
        const buffer = xlsx.build(config, options);
        const fileName = templateInfo.name + ".xlsx";
        const filePath =
          path.join(__dirname, "../public/template/") + `/${fileName}`;
        fs.writeFileSync(filePath, buffer, (err) => {
          if (err) {
            ctx.fail("模板导出失败", err);
          } else {
            ctx.success("模板导出成功");
          }
        });
      } else {
        ctx.exception("文件不存在");
      }
    } else {
      ctx.exception("type必传");
    }
  }

  /**
   * @swagger
   * /service-template/api/v1/import/template:
   *   post:
   *     summary: 导入模板
   *     description: 导入模板
   *     tags:
   *       - template
   *     operationId: importTemplate
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
   *         description: 导入模板
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
  static async importTemplate(ctx) {
    // 获取模板文件
    const file = ctx.request.files.file;
    if (file) {
      // 获取上传文件扩展名生成文件名
      const fileName = file.name;
      if (!validate.validateExcel(fileName)) {
        ctx.exception("请选择excel格式文件");
      }
      const list = xlsx.parse(file.path);
      const content = list[0].data;
      content.splice(0, 1); // 删掉第一行title标题
      console.log("文件内容", content);
      // 转换二维数据为指定的json结构数据
    } else {
      ctx.exception("请选择上传文件");
    }
  }
}

module.exports = TemplateController;
