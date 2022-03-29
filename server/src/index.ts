// Constants
import { __prod__, GRAPHQL_PATH } from "./constants";

// Server
import { createServer } from "http";
import express from "express";
import cors from "cors";
// import IORedis from "ioredis";

// redis@v4
import { PORT, CORS_CONFIG } from "./configs";
import initializeApolloServer from "./graphql";

// Services
import { authenticationMiddleware } from "./services/authentication";

const initializeHttpServer = async () => {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = createServer(app);

  // Cors
  app.use(cors(CORS_CONFIG));

  // Authentication
  app.use(authenticationMiddleware());
  app.set("trust proxy", !__prod__);

  // Apollo Server
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
