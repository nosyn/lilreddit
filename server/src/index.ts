import "reflect-metadata";
// Constants
import { __prod__, GRAPHQL_PATH } from "./constants";

// Server
import { createServer } from "http";
import express from "express";
import cors from "cors";
// import IORedis from "ioredis";

// redis@v4
// import session from "express-session";
// import connectRedis from "connect-redis";
import { PORT } from "./config";
import initializeApolloServer from "./graphql";

// Apply all configurations including middlewares to the respective objects
const initializeHttpServer = async () => {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = createServer(app);

  app.use(
    cors({
      credentials: true,
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
    })
  );

  // const redisClient = new IORedis({
  //   host: "redis",
  //   port: 6379,
  //   password: "redispassword",
  // });

  // const RedisStore = connectRedis(session);

  // app.use(
  //   session({
  //     name: COOKIES_NAME,
  //     store: new RedisStore({
  //       client: redisClient,
  //       // disableTouch: true,
  //       disableTTL: true,
  //     }),
  //     saveUninitialized: false,
  //     // TODO: Using environment variable
  //     secret: "keyboard cat",
  //     resave: false,
  //     cookie: {
  //       maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
  //       httpOnly: true, // cookie won't be accessible by Javascript on the front end
  //       secure: __prod__, // cookie only works in https or manually disable when using apollo studio
  //       // secure: true,
  //       sameSite: "lax", // csrf
  //     },
  //   })
  // );

  // Same ApolloServer initialization as before, plus the drain plugin.
  const apolloServer = initializeApolloServer(httpServer);

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
    path: GRAPHQL_PATH,
  });

  return httpServer;
};

const main = async () => {
  const httpServer = await initializeHttpServer();

  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:${PORT}${GRAPHQL_PATH}`);
};

main();
