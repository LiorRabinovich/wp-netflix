import { gql } from '@apollo/client';

export const GET_MENU = gql`
  query GET_MENU_BY_NAME {
    menu(id: "main", idType: NAME) {
      menuItems {
        nodes {
          url
          label
        }
      }
    }
  }
`;