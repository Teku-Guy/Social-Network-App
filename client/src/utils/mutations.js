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
  mutation addPost($body: String!) {
    addPost(body: $body) {
      id
      body
      createdAt
      username 
      likeCount
      likes {
        username
      }
      commentCount
      comments{
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!){
    likePost(postId: $postId){
      id
      likes{
        id
        username
      }
      likeCount
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!){
    deletePost(postId: $postId)
  }
`;

export const SUBMIT_COMMENT_MUTATION = gql`
  mutation submitComment($postId: ID!, $body: String!){
    submitComment(postId: $postId, body: $body){
      id
      comments{
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
  
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId){
      id
      comments{
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;