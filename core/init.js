const requireDirectory = require("require-directory");
const Router = require("koa-router");
const cors = require("koa-cors");
const koaBody = require("koa-body");
const { koaSwagger } = require("../public/swagger-ui");
const swagger = require("../middleware/swagger");
const responseHandle = require("../middleware/responseHandle");
const checkToken = require("../middleware/checkToken");
const schedule = require("../schedule/index");

class InitManager {
  // 统一初始化(中间件加载顺序很重要)
  static init(app) {
    InitManager.app = app;
    InitManager.initCors();
    InitManager.initBody();
    InitManager.initSwagger();
    InitManager.initResponseHandle();
    InitManager.initCheckToken();
    InitManager.initLoadRouters();
    InitManager.initSchedule();
  }

  // cors解决跨域
  static initCors() {
    InitManager.app.use(cors());
  }

  // body配置
  static initBody() {
    InitManager.app.use(
      koaBody({
        multipart: true, // 支持文件上传
        formidable: {
          maxFileSize: 2 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
          keepExtensions: true, // 保持文件的后缀
        },
      })
    );
  }

  // swagger接口文档
  static initSwagger() {
    InitManager.app.use(swagger.routes(), swagger.allowedMethods());
    InitManager.app.use(
      koaSwagger({
        routePrefix: "/swagger",
        swaggerOptions: {
          url: "/swagger.json",
        },
      })
    );
  }

  // response返回处理
  static initResponseHandle() {
    InitManager.app.use(responseHandle());
  }

  // 路由token校验
  static initCheckToken() {
    InitManager.app.use(checkToken);
  }

  // 路由自动注册
  static initLoadRouters() {
    // 获取路由目录的绝对路径
    const apiDirectory = `${process.cwd()}/routes`;
    requireDirectory(module, apiDirectory, {
      visit: (obj) => {
        if (obj instanceof Router) {
          InitManager.app.use(obj.routes());
        }
      },
    });
  }

  // 定时任务
  static initSchedule() {
    schedule();
  }
}

module.exports = InitManager;
