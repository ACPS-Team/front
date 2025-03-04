import { gql } from '@/__generated__/gql'

export const LOGIN_USER = gql(`
  mutation LoginUser($data: LoginUserDto!) {
    loginUser(data: $data) {
      token
      user {
        id
        email
        firstName
        lastName
        birthDate
        birthPlace
        nationality
        role
      }
    }
  }
`)

export const REGISTER_USER = gql(`
  mutation RegisterUser($data: RegisterUserDto!) {
    registerUser(data: $data) {
      id
      email
      firstName
      lastName
      birthDate
      birthPlace
      nationality
      role
    }
  }
`)

export const UPDATE_PASSWORD = gql(`
  mutation UpdatePassword($data: UpdatePasswordDto!) {
    updatePassword(data: $data) {
      token
      user {
        id
        email
        firstName
        lastName
        birthDate
        birthPlace
        nationality
        role
      }
    }
  }
`)

export const DELETE_MY_ACCOUNT = gql(`
  mutation DeleteMyAccount {
    deleteMyAccount
  }
`)

export const DELETE_USER = gql(`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id)
  }
`) 