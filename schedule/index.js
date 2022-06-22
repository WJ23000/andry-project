const schedule = require("node-schedule");

// 每分钟第30秒触发

const taskOne = schedule.scheduleJob("30 * * * * *", () => {
  console.log("每分钟第30秒触发一次：" + new Date());
});

// 凌晨0时触发
const taskTwo = schedule.scheduleJob("0 0 0 * * *", () => {
  console.log("凌晨0时触发一次：" + new Date());
});

module.exports = { taskOne, taskTwo };
