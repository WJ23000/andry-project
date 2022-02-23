const Sequelize = require("sequelize");
const { dbConfig } = require("./config");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    // operatorsAliases: false,
    dialectOptions: {
      // 字符集
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
      supportBigNumbers: true,
      bigNumberStrings: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      underscored: true, // 表字段以下划线_来分割（默认是驼峰命名风格）
    },
    timezone: "+08:00", // 东八时区
  }
);

module.exports = {
  sequelize,
};
