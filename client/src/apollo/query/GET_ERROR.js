import { gql } from '@apollo/client';
import { GET_MENU } from './GET_MENU';

export const GET_ERROR = gql`
  query GET_HOME {
    ${GET_MENU}
  }
`;