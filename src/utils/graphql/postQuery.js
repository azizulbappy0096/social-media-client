import { gql } from "@apollo/client";

export const allPost = gql`
  {
    getPosts {
      id
      username
      body
      createdAt
      comments {
        id
        body
        username
      }
      likes {
        username
      }
      commentCount
      likeCount
    }
  }
`;
