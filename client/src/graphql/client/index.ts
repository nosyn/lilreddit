import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8080/api/graphql",
  credentials: "include",
  cache: new InMemoryCache(),
});

export { client };
