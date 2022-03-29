// Apollo
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer, Context } from "apollo-server-core";
import { Server } from "http";

// Context
import context from "./context";

// Schema
import schema from "./schema";

// Same ApolloServer initialization as before, plus the drain plugin.
const initializeApolloServer = (httpServer: Server) =>
  new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context,
  });

export default initializeApolloServer;
