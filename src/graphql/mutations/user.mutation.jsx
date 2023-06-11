import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($data: UserInput!) {
    createUser(data: $data) {
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

export const UPDATE_USER = gql`
  mutation updateUser($data: UserInput!) {
    updateUser(data: $data) {
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

export const DELETE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
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

export const CREATE_USER_WITH_PACKAGES = gql`
  mutation createUserWithPackages($user: UserInput!, $pkg: String!) {
    createUserWithPackages(user: $user pkg: $pkg) {
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