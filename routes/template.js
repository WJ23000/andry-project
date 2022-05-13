const router = require("koa-router")();
const TemplateController = require("../controllers/template");

router.prefix("/service-template/api/v1");
// 导出模板-通过
router.get("/export/template", TemplateController.exportTemplate);
// 导入模板-通过
router.post("/import/template", TemplateController.importTemplate);

module.exports = router;
