import { gql } from '@apollo/client';

export const GET_USER_ME = gql`
  query getUser {
    getUserMe {
      id
      name
      email
      sex
    }
  }
`;