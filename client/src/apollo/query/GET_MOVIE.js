import { gql } from '@apollo/client';
import { GET_MENU } from './GET_MENU';
import { POST_FIELDS } from '../fields/POSTS_FIELDS'

export const GET_MOVIE = gql`
  query GET_MOVIE ($databaseId: Int!) {
    ${GET_MENU}
    
    movieBy(movieId: $databaseId) {
      ${POST_FIELDS}
    }
  }
`;