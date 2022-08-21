import { gql } from "@apollo/client";

export const FETCH_THOUGHTS_QUERY = gql`
  {
    getThoughts {
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

export const FETCH_THOUGHT_QUERY = gql`
  query($thoughtId: ID!){
    getThought(thoughtId: $thoughtId){
      id
      body
      createdAt
      username
      likeCount
      likes{
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