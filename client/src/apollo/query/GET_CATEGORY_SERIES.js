import { gql } from '@apollo/client';
import { GET_MENU } from './GET_MENU';
import { POSTS_FIELDS } from '../fields/POSTS_FIELDS'

const WHERE = `where: {orderby: {field: DATE, order: DESC}}, first: 10`;

export const GET_CATEGORY_SERIES = gql`
  query GET_CATEGORY_SERIES {
    ${GET_MENU}

    category(id: "series/category/dramatic", idType: SLUG) {
      name
      slug
      series(${WHERE}) {
          ${POSTS_FIELDS}
      }
    }

    postBy(slug: "series/category/dramatic") {
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