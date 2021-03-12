import { gql } from '@apollo/client';
import { GET_MENU } from './GET_MENU';
import { POSTS_FIELDS } from '../fields/POSTS_FIELDS'

const WHERE = `where: {orderby: {field: DATE, order: DESC}}, first: 10`;

export const GET_HOME = gql`
  query GET_HOME {
    ${GET_MENU}

    series(${WHERE}) {
      ${POSTS_FIELDS}
    }
    
    movies(${WHERE}) {
      ${POSTS_FIELDS}
    }

    pageBy(pageId: 2) {
      title
      content
      extraPostInfo {
        cover {
          mediaItemUrl
        }
      }
    }
  }
`;