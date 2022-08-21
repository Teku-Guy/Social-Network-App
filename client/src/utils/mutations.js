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

export const DELETE_POST_MUTATION = gql`
  mutation deleteThought($thoughtId: ID!){
    deleteThought(thoughtId: $thoughtId)
  }
`;

export const SUBMIT_REACTION_MUTATION = gql`
  mutation createReaction($thoughtId: ID!, $body: String!){
    createReaction( thoughtId: $thoughtId, body: $body){
      id
      reactions{
        id
        username
        createdAt
        body
      }
      reactionCount
    }
  }
  
`;

export const DELETE_REACTION_MUTATION = gql`
  mutation deleteReaction($thoughtId: ID!, $reactionId: ID!) {
    deleteReaction(thoughtId: $thoughtId, reactionId: $reactionId){
      id
      reactions{
        id
        username
        createdAt
        body
      }
      reactionCount
    }
  }
`;