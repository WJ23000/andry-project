// const env = process.env.NODE_ENV;
// console.log("当前环境", env);
const dbConfig = {
  username: "root",
  password: "root",
  database: "andry",
  host: "localhost",
  port: "3306",
  dialect: "mysql",
};

const jwtConfig = {
  secret: "wjwjwjwjwj",
};

const redisConfig = {
  host: "localhost",
  port: 6379,
  password: "",
  db: 0,
};

const qiniuConfig = {
  accessKey: "TTxkwDx0Vs6u4b4XwNcPD7htXXhoSYC6TpLclkYV",
  secretKey: "kS6qR6xsmiEK2bfNuLFLVVTSzONguK59gAlt-5Z8",
  scope: "andry", // 空间名
};

module.exports = {
  dbConfig: dbConfig,
  jwtConfig: jwtConfig,
  redisConfig: redisConfig,
  qiniuConfig: qiniuConfig,
};
