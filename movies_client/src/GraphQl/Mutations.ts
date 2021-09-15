import { gql } from '@apollo/client'
export const REMOVE_MOVIE = gql`
  mutation removeMovie($id: ID!) {
    removeMovie(id: $id) {
      id
      name
    }
  }
`
export const ADD_MOVIE = gql`
  mutation addMovie(
    $name: String!
    $releaseDate: String!
    $duration: Int!
    $actors: String!
    $rating: Int!
  ) {
    addMovie(
      name: $name
      releaseDate: $releaseDate
      duration: $duration
      actors: $actors
      rating: $rating
    ) {
      id
      name
      releaseDate
      duration
      actors
      rating
    }
  }
`

export const UPDATE_MOVIE = gql`
  mutation updateMovie(
    $id: ID!
    $name: String!
    $releaseDate: String!
    $duration: Int!
    $actors: String!
    $rating: Int!
  ) {
    updateMovie(
      id: $id
      name: $name
      releaseDate: $releaseDate
      duration: $duration
      actors: $actors
      rating: $rating
    ) {
      id
      name
      releaseDate
      duration
      actors
      rating
    }
  }
`

export const AUTH = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`

export const REGISTER = gql`
  mutation register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      id
      username
    }
  }
`
