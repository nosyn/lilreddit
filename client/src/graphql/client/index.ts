import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Post } from "../generated/graphql";

const client = new ApolloClient({
  uri: "http://localhost:8080/api/graphql",
  credentials: "include",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            keyArgs: [],
            merge(existing: Post[] | [], incoming: Post[]): Post[] {
              return [...(existing || []), ...incoming];
            },
          },
        },
      },
    },
  }),
});

export { client };
