const router = require("koa-router")();

const CommonController = require("../controllers/common");


router.prefix('/service-common/api/v1')

// 注册新用户
router.post("/register", CommonController.register);

// 用户登录
router.post("/login", CommonController.login);

// 退出登录
router.get("/exit/login", CommonController.exitLogin);

// 修改用户密码
router.post("/update/pwd", CommonController.updatePwd);

// 刷新token
router.get("/refresh/token", CommonController.refreshToken);

module.exports = router;
