import { gql } from '@apollo/client';

export const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(
      email: $email
      password: $password
    ) {
      id
      name
      email
      password
      picture
      role
      categories
      birthday
      gender
      phone
      address
      city
      country
      accessToken
    }
  }
`;

export const LOGIN_WITH_GOOGLE = gql`
  query loginWithGoogle($data: UserGoogleInput!) {
    loginWithGoogle(data: $data) {
      id
      name
      email
      password
      picture
      role
      categories
      birthday
      gender
      phone
      address
      city
      country
      accessToken
    }
  }
`;

export const CHECK_USER_EXISTS = gql`
  query checkUserExists($email: String!) {
    checkUserExists(email: $email)
  }
`

export const GET_PLANNERS = gql`
  query getPlanners {
    getPlanners {
      id
      createdAt
      updatedAt
      name
      email
      password
      picture
      role
      categories
      birthday
      gender
      phone
      address
      city
      country
      accessToken
    }
  }
`

export const GET_USER = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      id
      name
      email
      password
      picture
      role
      categories
      birthday
      gender
      phone
      address
      city
      country
      accessToken
    }
  }
`

export const GET_USERS_WITH_IDS = gql`
  query getUsersWithIds($userIds: [String!]!) {
    getUsersWithIds(userIds: $userIds) {
      id
      name
      email
      password
      picture
      role
      categories
      birthday
      gender
      phone
      address
      city
      country
      accessToken
    }
  }
`;