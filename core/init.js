const requireDirectory = require("require-directory");
const Router = require("koa-router");
const cors = require("koa-cors");
const responseHandle = require("../middleware/responseHandle");
const checkToken = require("../middleware/checkToken");
const swagger = require('../utils/swagger');
const { koaSwagger } = require('koa2-swagger-ui');


class InitManager {
  // 统一初始化
  static init(app) {
    InitManager.app = app;
    InitManager.initCors();
    InitManager.initResponseHandle();
    InitManager.initCheckToken();
    InitManager.initLoadRouters();
    InitManager.initSwagger();
  }

  // cors解决跨域
  static initCors() {
    InitManager.app.use(cors());
  }

  // swagger接口文档
  static initSwagger() {
    InitManager.app.use(swagger.routes(), swagger.allowedMethods())
    InitManager.app.use(koaSwagger({
      routePrefix: '/swagger',
      swaggerOptions: {
        url: '/swagger.json'
      }
    }))
  }

  // 统一reponse返回处理
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
}

module.exports = InitManager;
