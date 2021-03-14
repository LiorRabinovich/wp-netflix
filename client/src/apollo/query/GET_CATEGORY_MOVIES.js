import { gql } from '@apollo/client';
import { GET_MENU } from './GET_MENU';
import { POSTS_FIELDS } from '../fields/POSTS_FIELDS'

const WHERE = `where: {orderby: {field: DATE, order: DESC}}, first: 10`;

export const GET_CATEGORY_MOVIES = gql`
  query GET_CATEGORY_MOVIES ($slug: String!) {
    ${GET_MENU}

    categories(where: {search: $slug}) {
      nodes {
        name
        slug
        movies(${WHERE}) {
            ${POSTS_FIELDS}
        }
      }
    }

    postBy(slug: "index") {
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