const regular = require("../model/regular");

class validate {
  // 校验文件是否是excel文件
  static validateExcel(suffix) {
    return suffix === "xls" || suffix === "xlsx" ? true : false;
  }
}

module.exports = validate;
