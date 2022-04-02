const router = require("koa-router")();

const ScheduleController = require("../controllers/schedule");

router.prefix("/service-schedule/api/v1");

// 取消定时任务-通过
router.post("/cancel/taskDemo", ScheduleController.cancelTaskDemo);

// 取消定时任务2-通过
router.post("/cancel/taskDemo2", ScheduleController.cancelTaskDemo2);


module.exports = router;
