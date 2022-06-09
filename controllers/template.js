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
      const userList = [
        {
          username: "导出",
          password: "123456",
          age: 25,
          sex: "男",
        },
      ];
      if (templateInfo) {
        const config = [
          {
            name: templateInfo.name,
            data: [],
          },
        ];
        // 设置title
        config[0].data.unshift(templateInfo.title);
        // 由于各列数据长度不同，可以设置一下列宽
        const options = {
          "!cols": templateInfo.width,
        };
        // json数据中对象的值转换成数组添加到excel数据中
        userList.forEach((item) => {
          var arrInner = [];
          arrInner.push(item.username);
          arrInner.push(item.password);
          arrInner.push(item.age);
          arrInner.push(item.sex);
          config[0].data.push(arrInner);
        });
        const buffer = xlsx.build(config, options);
        const fileName = templateInfo.name + ".xlsx";
        const filePath =
          path.join(__dirname, "../public/template/") + `${fileName}`;
        fs.writeFileSync(filePath, buffer, (err) => {
          ctx.fail("模板导出失败", err);
        });
        ctx.success("模板导出成功");
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
      // 校验文件是否excel格式文件
      const suffix = file.name.split(".").pop();
      if (!validate.validateExcel(suffix)) {
        ctx.exception("请选择excel格式文件");
        return;
      }
      const list = xlsx.parse(file.path);
      const data = list[0].data;
      data.splice(0, 1); // 删掉第一行title标题
      console.log("转换前的Excel内容", data);
      // 转换二维数组为指定的json结构数据存入数据库
      let initArr = [];
      for (let i = 0; i < data.length; i++) {
        let obj = {};
        obj.username = data[i][0];
        obj.password = data[i][1];
        obj.age = data[i][2];
        obj.sex = data[i][3];
        initArr.push(obj);
      }
      ctx.success("模板导入成功", initArr);
    } else {
      ctx.exception("请选择上传文件");
    }
  }
}

module.exports = TemplateController;
