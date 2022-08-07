import { gql } from "@apollo/client";

export const FETH_THOUGHTS_QUERY = gql`
  {
    getThoughts{
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
`