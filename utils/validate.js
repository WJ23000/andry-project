const regular = require("../model/regular");

class validate {
  // 校验文件是否是excel文件
  static validateExcel(fileName) {
    return regular.excel.test(fileName);
  }
}

module.exports = validate;
