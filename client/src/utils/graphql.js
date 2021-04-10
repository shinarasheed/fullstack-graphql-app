import { gql } from '@apollo/client';

export const FETCH_POST_QUERY = gql`
  query {
    getPosts {
      id
      username
      body
      createdAt
      likes {
        username
      }
      likeCount
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;
