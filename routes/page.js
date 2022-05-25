const router = require("koa-router")();
const PageController = require("../controllers/page");

// 主页-通过
router.get("/index", PageController.index);

module.exports = router;
