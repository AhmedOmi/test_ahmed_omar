import { currentUser, register, login } from './auth'
import { getAllMovies, addMovie, removeMovie, updateMovie } from './movie'

const resolverMap = {
  Query: {
    currentUser,
    movies: getAllMovies,
  },
  Mutation: {
    login,
    register,
    addMovie,
    removeMovie,
    updateMovie,
  },
}

export default resolverMap
