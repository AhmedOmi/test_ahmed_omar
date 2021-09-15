import { gql } from '@apollo/client'

export const LOAD_MOVIES = gql`
  {
    movies {
      id
      name
      releaseDate
      duration
      actors
      rating
    }
  }
`
