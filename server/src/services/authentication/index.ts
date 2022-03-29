import session from "express-session";
import connectRedis from "connect-redis";

// Constants
import { COOKIES_NAME, __prod__ } from "../../constants";

// Services
import redisClient from "../redis";

const authenticationMiddleware = () => {
  const RedisStore = connectRedis(session);
  return session({
    name: COOKIES_NAME,
    store: new RedisStore({
      client: redisClient,
      disableTouch: true,
      disableTTL: true,
    }),
    saveUninitialized: false,
    // TODO: Using environment variable
    secret: "keyboard cat",
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
      httpOnly: true, // cookie won't be accessible by Javascript on the front end
      secure: true, // cookie only works in https
      sameSite: __prod__ ? "lax" : "none", // csrf
    },
  });
};

export { authenticationMiddleware };
