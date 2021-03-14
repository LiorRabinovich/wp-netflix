import { gql } from '@apollo/client';
import { GET_MENU } from './GET_MENU';
import { POSTS_FIELDS } from '../fields/POSTS_FIELDS'
import { cacheSlot } from '@apollo/client/cache';

const WHERE = `where: {orderby: {field: DATE, order: DESC}}, first: 10`;

function calc($slug) {
  return `movies/category/${$slug}`
}

export const GET_CATEGORY_SERIES = gql`
  query GET_CATEGORY_SERIES ($slug: String, $pageSlug: String) {
    ${GET_MENU}

    categories(where: {search: $slug}) {
      nodes {
        name
        slug
        series(${WHERE}) {
            ${POSTS_FIELDS}
        }
      }
    }

    postBy(slug: $pageSlug) {
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