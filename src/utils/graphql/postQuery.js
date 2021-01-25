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

export const getPostById = gql`
  query GetPost($postId: ID!) {
    getPost(postId: $postId) {
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

export const deletePostById = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId) 
  }
`;

export const likePostById = gql`
  mutation LikePost($postId: ID!) {
    like(postId: $postId) {
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