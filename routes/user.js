const router = require("koa-router")();
const UserController = require("../controllers/user");

router.prefix("/service-user/api/v1");
// 创建单个用户-通过
router.post("/create", UserController.createUser);
// 批量创建用户-通过
router.post("/create/batch", UserController.createUserBatch);
// 查询用户列表-通过
router.get("/query/list", UserController.getUserList);
// 根据id编辑单个用户-通过
router.post("/update", UserController.updateUser);
// 批量编辑用户-数据没更新
router.post("/update/batch", UserController.updateUserBatch);
// 根据id数组批量删除用户-通过
router.post("/delete/batch", UserController.deleteUserBatch);
// 根据id查询用户详情-通过
router.get("/query/detail", UserController.getUserDetail);

module.exports = router;
