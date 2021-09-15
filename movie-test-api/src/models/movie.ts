import mongoose from 'mongoose'

export interface Movie extends mongoose.Document {
  _id: string
  name: string
  releaseDate: string
  duration: number
  actors: string
  rating: number
}

const MovieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    releaseDate: { type: String, required: true },
    duration: { type: Number, required: true },
    actors: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    versionKey: false,
  },
)

export const MovieModel = mongoose.model<Movie>('Movie', MovieSchema, 'Movies')
