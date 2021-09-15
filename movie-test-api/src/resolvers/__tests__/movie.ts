import { MovieModel } from '../../models'
import * as setup from '../../__tests__/setup'
import { addMovie, removeMovie, updateMovie } from '../movie'

let testMongo: setup.TestMongoConn

beforeEach(async () => {
  testMongo = await setup.beforeEach()
})

afterEach(() => setup.afterEach(testMongo))

describe('Test of movie creation', () => {
  it('Should create movie', async () => {
    const response = await addMovie(undefined, {
      id: 'testId',
      name: 'The great gatsby',
      releaseDate: '12/12/2014',
      duration: 1,
      actors: 'Leonardo decaprio ,',
      rating: 4,
    })
    expect(response.actors).toEqual('Leonardo decaprio ,')
  })
})

describe('Test of update movie', () => {
  it('Should throw an error if movie does not exist', async () => {
    let error
    try {
      await updateMovie(undefined, {
        id: 'testId',
        name: 'The great gatsby',
        releaseDate: '12/12/2014',
        duration: 1,
        actors: 'Leonardo decaprio ,',
        rating: 4,
      })
    } catch (e) {
      error = e
    }
    expect(error).toEqual(
      new Error(
        'Error while updating:CastError: Cast to ObjectId failed for value "testId" at path "_id" for model "Movie"',
      ),
    )
  })
  it('Should update an existant movie', async () => {
    const movie = new MovieModel({
      name: 'The great gatsby',
      releaseDate: '12/12/2014',
      duration: 1,
      actors: 'Leonardo decaprio ,',
      rating: 4,
    })
    await movie.save()
    const response = await updateMovie(undefined, {
      id: movie.id,
      name: 'The great gatsby',
      releaseDate: '12/12/2014',
      duration: 1,
      actors: 'Rambo ,',
      rating: 4,
    })
    if (response && response.actors) {
      expect(response.actors).toEqual('Rambo ,')
    }
  })
})

describe('test of removing movie', () => {
  it('Should throw an error if movie does not exist', async () => {
    let error
    try {
      await removeMovie(undefined, {
        id: 'testId',
        name: 'The great gatsby',
        releaseDate: '12/12/2014',
        duration: 1,
        actors: 'Leonardo decaprio ,',
        rating: 4,
      })
    } catch (e) {
      error = e
    }
    expect(error).toEqual(
      new Error(
        'Error while removing:CastError: Cast to ObjectId failed for value "testId" at path "_id" for model "Movie"',
      ),
    )
  })
  it('Should remove the movie if it is existing', async () => {
    const movie = new MovieModel({
      name: 'The great gatsby',
      releaseDate: '12/12/2014',
      duration: 1,
      actors: 'Leonardo decaprio ,',
      rating: 4,
    })
    await movie.save()
    const response = await removeMovie(undefined, {
      id: movie.id,
      name: 'The great gatsby',
      releaseDate: '12/12/2014',
      duration: 1,
      actors: 'Rambo ,',
      rating: 4,
    })

    expect(response.name).toEqual('The great gatsby')
  })
})
