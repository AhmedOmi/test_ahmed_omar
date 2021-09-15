import { MovieModel, Movie } from '../models/movie'
import { MovieInfo } from 'src/types'

export async function addMovie(_: void, args: MovieInfo): Promise<Movie> {
  try {
    const movie: Movie = new MovieModel(args)
    await movie.save()
    return movie
  } catch (error) {
    throw new Error(`Error while saving:${error}`)
  }
}

export async function getAllMovies() {
  try {
    const movies = await MovieModel.find()
    return movies
  } catch (error) {
    throw new Error(`Error while fetching data: ${error}`)
  }
}

export async function removeMovie(
  _: void,
  args: MovieInfo,
): Promise<Record<string, string | number>> {
  try {
    const movie = await MovieModel.findOneAndDelete({ _id: args.id })
    if (movie === null) {
      throw new Error(`No movies is existing with this id: ${args.id}`)
    }
    return { id: movie.id, name: movie.name }
  } catch (error) {
    throw new Error(`Error while removing:${error}`)
  }
}

export async function updateMovie(
  _: void,
  args: MovieInfo,
): Promise<Movie | null> {
  const filter = { _id: args.id }
  const updatedMovie = {
    name: args.name,
    releaseDate: args.releaseDate,
    rating: args.rating,
    duration: args.duration,
    actors: args.actors,
  }
  try {
    return await MovieModel.findOneAndUpdate(filter, updatedMovie, {
      new: true,
    })
  } catch (error) {
    throw new Error(`Error while updating:${error}`)
  }
}
