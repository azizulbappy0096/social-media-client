import { gql } from "@apollo/client";

export const registerUser = gql`
  mutation Register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      token
      username
      email
    }
  }
`;

export const loginUser = gql`
  mutation Login($username: String!, $password: String!) {
    login(
      username: $username
      password: $password
    ) {
      id
      token
      username
      email
    }
  }
`;
