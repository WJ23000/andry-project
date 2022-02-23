const router = require("koa-router")();

const CommonController = require("../controllers/common");


router.prefix('/api')

// 注册
router.post("/register", CommonController.register);

// 登录
router.post("/login", CommonController.login);

// 退出登录
router.get("/exit/login", CommonController.exitLogin);

// 刷新token
router.get("/refresh/token", CommonController.refreshToken);

module.exports = router;
