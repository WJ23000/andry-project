const router = require("koa-router")();
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");
const getIpAddress = require("./os")

const ip = getIpAddress()

const swaggerDefinition = {
  info: {
    title: "andry项目API接口文档",
    version: "1.0.0",
    description:
      "This is a sample server Petstore server. You can find out more about Swagger at http://swagger.io or on irc.freenode.net, #swagger. For this sample, you can use the api key special-key to test the authorization filters.",
  },
  host: ip + ":3000", // 想着改这里，如果不修改，那么接口文档访问地址为：localhost:3000/swagger
  basePath: "/", // Base path (optional)
  schemes: ["http", "https"],
  // securityDefinitions: {
  //   apiKey: {
  //     type: "apiKey",
  //     in: "header",
  //     name: "Authorization",
  //     description: "Authorization format : Bearer {token}",
  //   },
  // },
  // enableSecurity: true,
};
const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, "../controllers/*.js")], // 写有注解的router的存放地址, 最好path.join()
};
const swaggerSpec = swaggerJSDoc(options);
// 通过路由获取生成的注解文件
router.get("/swagger.json", async function (ctx) {
  ctx.set("Content-Type", "application/json");
  ctx.body = swaggerSpec;
});

module.exports = router;
