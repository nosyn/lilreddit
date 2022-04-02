import IORedis from "ioredis";

const redisClient = new IORedis({
  host: "redis",
  port: 6379,
  password: process.env.REDIS_PASSWORD || "redispassword",
});

export default redisClient;
