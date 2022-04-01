const os = require("os");

// 获取本机ip
class system {
  static getIpAddress() {
    const newWork = os.networkInterfaces();
    for (let item in newWork) {
      const data = newWork[item];
      for (let i = 0; i < data.length; i++) {
        const alias = data[i];
        if (
          alias.family === "IPv4" &&
          alias.address !== "127.0.0.1" &&
          !alias.internal
        ) {
          return alias.address;
        }
      }
    }
  }
}

module.exports = system;
