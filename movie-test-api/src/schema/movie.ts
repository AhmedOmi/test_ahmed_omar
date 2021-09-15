const typeDef = `
  type Movie {
    id: ID!
    name: String
    releaseDate: String
    duration: Int
    actors: String
    rating: Int
  }
  type RemoveResponse {
    id: ID!
  }
  extend type Query {
    movies: [Movie]!
  }
  extend type Mutation {
    addMovie(name: String!, releaseDate: String!, duration: Int!, actors: String!, rating: Int!): Movie!
    removeMovie(id: ID!): Movie!
    updateMovie(id: ID!, name: String!, releaseDate: String!, duration: Int!, actors: String!, rating: Int!): Movie!
  }    
`
export default typeDef
