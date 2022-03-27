import { gql } from "apollo-server-express";

const Post = gql`
  type Post {
    id: Int
    createdAt: String
    updatedAt: String
    title: String
    content: String
    published: Boolean
    viewCount: Int
    author: User
    authorId: Int
  }

  type Query {
    posts: [Post]
  }
`;

export default Post;
