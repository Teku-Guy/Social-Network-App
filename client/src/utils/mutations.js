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

export const CREATE_POST_MUTATION = gql`
  mutation addThought($body: String!) {
    addThought(body: $body) {
      id
      body
      createdAt
      username 
      likeCount
      likes {
        username
      }
      reactionCount
      reactions{
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const LIKE_POST_MUTATION = gql`
  mutation likeThought($thoughtId: ID!){
    likeThought(thoughtId: $thoughtId){
      id
      likes{
        id
        username
      }
      likeCount
    }
  }
`;