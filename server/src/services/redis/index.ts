import IORedis from "ioredis";

// const redisClient = new IORedis({
//   host: "redis",
//   port: 6379,
//   password: "redispassword",
// });
const redisClient = new IORedis();

export default redisClient;
