import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!){
    register(
      registerInput:{
        username: $username,
        email: $email,
        password: $password
      }
    ){
      token
      user{
        id
        email
        username
        createdAt
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user{
        id
        email
        username
        createdAt
      }
    }
  }
`;