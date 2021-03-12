import { gql } from '@apollo/client';
import { GET_MENU } from './GET_MENU';
import { POST_FIELDS } from '../fields/POSTS_FIELDS'

export const GET_SERIE = gql`
  query GET_SERIE ($databaseId: Int!) {
    ${GET_MENU}
    
    serieBy(serieId: $databaseId) {
      ${POST_FIELDS}
    }
  }
`;