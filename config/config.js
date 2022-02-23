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

module.exports = {
  dbConfig: dbConfig,
  jwtConfig: jwtConfig,
  redisConfig: redisConfig,
};
