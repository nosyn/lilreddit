import { gql } from "apollo-server-express";

const User = gql`
  type User {
    id: Int
    email: String
    name: String
    posts: [Post]
  }

  type Query {
    users: [User]
  }
`;

export default User;
