const schedule = require("node-schedule");

function scheduleTask() {
  // 每分钟的第30秒触发
  schedule.scheduleJob("30 * * * * *", function () {
    console.log("每分钟的30秒触发一次:" + new Date());
  });

  // 凌晨0时触发
  schedule.scheduleJob("* * 0 * * *", function () {
    console.log("凌晨0时:" + new Date());
  });
}

module.exports = scheduleTask;
