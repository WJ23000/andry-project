const Redis = require("ioredis");
const { redisConfig } = require("../config/config");
const config = {
  host: redisConfig.host, 
  port: redisConfig.port,
  prefix: redisConfig.prefix, // 存诸前缀
  db: redisConfig.db,
};
const redis = new Redis(config);
module.exports = redis;
