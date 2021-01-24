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

export const createPost = gql`
  mutation AddPost($body: String!) {
    addPost(body: $body) {
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
