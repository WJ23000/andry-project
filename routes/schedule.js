const router = require("koa-router")();
const ScheduleController = require("../controllers/schedule");

router.prefix("/service-schedule/api/v1");
// 启动定时one-通过
router.post("/start/task/one", ScheduleController.startTaskOne);
// 取消定时one-通过
router.post("/stop/task/one", ScheduleController.stopTaskOne);
// 启动定时two-通过
router.post("/start/task/two", ScheduleController.startTaskTwo);
// 取消定时two-通过
router.post("/stop/task/two", ScheduleController.stoplTaskTwo);

module.exports = router;
