import { gql } from "@apollo/client";

export const FETCH_ALL_POSTS_QUERY = gql`
  query getAllPosts{
    getPosts {
      id
      body
      createdAt
      username
      profileImgUrl
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

export const FETCH_POST_QUERY = gql`
  query getPostById($postId: ID!){
    getPost(postId: $postId){
      id
      body
      createdAt
      username
      profileImgUrl
      likeCount
      likes{
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

export const FETCH_PROFILE_QUERY = gql`
  query getUserByUsername($username: String!){
    getUser(username: $username){
      id
      username
      profileImgUrl
      bio
    }
  }
`;

export const FETCH_USER_POSTS_QUERY = gql`
  query getPostByUser($username: String!){
    getPostByUser(username: $username){
      id
      body
      createdAt
      likeCount
      username
      profileImgUrl
      likes{
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

export const FETCH_USER_AVATAR_QUERY = gql`
  query GetUserAvatar($username: String) {
    getUser(username: $username) {
      username
      profileImgUrl
    }
  }
`;