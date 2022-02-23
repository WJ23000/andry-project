const router = require('koa-router')();
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const swaggerDefinition = {
    info: {
        title: 'andry项目API接口文档',
        version: '1.0.0',
        description: 'API',
    },
    host: 'localhost:3000', // 想着改这里，如果不修改，那么接口文档访问地址为：localhost:3000/swagger
    basePath: '/' // Base path (optional)
};
const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, './routes/*.js')], // 写有注解的router的存放地址, 最好path.join()
};
const swaggerSpec = swaggerJSDoc(options)
// 通过路由获取生成的注解文件
router.get('/swagger.json', async function (ctx) {
    ctx.set('Content-Type', 'application/json');
    ctx.body = swaggerSpec;
})

module.exports = router;
