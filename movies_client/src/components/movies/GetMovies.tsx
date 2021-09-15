import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { LOAD_MOVIES } from '../../GraphQl/Queries'
import { Movie } from '../../common/interfaces'
import { Button, Header, Icon, Rating, Table } from 'semantic-ui-react'
import AddEditMovie from './AddEditMovie'
import { REMOVE_MOVIE, ADD_MOVIE, UPDATE_MOVIE } from '../../GraphQl/Mutations'
import { cloneDeep, orderBy } from 'lodash'
import 'semantic-ui-css/semantic.min.css'
import Cookies from 'universal-cookie'

function GetMovies() {
  const cookie = new Cookies()
  const [sorters, setSorters] = useState<
    Record<string, 'desc' | 'asc' | boolean>
  >({
    name: cookie.get('name') ? cookie.get('name') : 'desc',
    releaseDate: cookie.get('releaseDate') ? cookie.get('releaseDate') : 'desc',
    duration: cookie.get('duration') ? cookie.get('duration') : 'desc',
    actors: cookie.get('actors') ? cookie.get('actors') : 'desc',
    rating: cookie.get('rating') ? cookie.get('rating') : 'desc',
  })
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const { error, loading, data } = useQuery(LOAD_MOVIES)
  const [removeMovie] = useMutation(REMOVE_MOVIE)
  const [updateMovie] = useMutation(UPDATE_MOVIE)
  const [addMovie] = useMutation(ADD_MOVIE)
  const [movies, setMovies] = useState<Movie[]>([])
  const [movieToBeEdited, setMovieToBeEdited] = useState<Movie>({
    id: '',
    name: '',
    releaseDate: '',
    duration: 0,
    actors: '',
    rating: 0,
  })
  const [open, setOpen] = useState<boolean>(false)
  useEffect(() => {
    fetchMovies()
  }, [data])
  function fetchMovies() {
    if (error) {
      throw new Error(`error in the grapheql side: ${error}`)
    }
    if (data) {
      setMovies(data.movies)
    }
  }
  function onOpen(open: boolean) {
    setOpen(open)
  }
  function setStateOfTheMovieToBeEdited(movie: Movie) {
    setIsEdit(true)
    setOpen(true)
    const movieToBeChanged = movie ? movie : movieToBeEdited
    setMovieToBeEdited(movieToBeChanged)
  }
  async function saveMovie(movie: Movie) {
    setOpen(false)
    try {
      if (isEdit) {
        const variableToPass = {
          id: movie.id,
          name: movie.name,
          releaseDate: movie.releaseDate,
          duration: movie.duration,
          rating: movie.rating,
          actors: movie.actors,
        }
        await updateMovie({
          variables: variableToPass,
        })
      } else {
        let moviesCopy = cloneDeep(movies)
        const { data } = await addMovie({
          variables: {
            name: movie.name,
            releaseDate: movie.releaseDate,
            duration: movie.duration,
            rating: movie.rating,
            actors: movie.actors,
          },
        })
        moviesCopy.push(data.addMovie)
        setMovies(moviesCopy)
      }
    } catch (error) {
      throw new Error(`Error during the saving process: ${error}`)
    }
  }
  async function triggerMovieRemoval(movieId: string) {
    try {
      const { data } = await removeMovie({ variables: { id: movieId } })
      const filteredMovies = movies?.filter((x) => x.id !== data.removeMovie.id)
      setMovies(filteredMovies)
    } catch (error) {
      throw new Error(`error while removing : ${error}`)
    }
  }

  function handleSorting(prop: any): void {
    switch (prop) {
      case 'name':
        if (sorters.name == 'desc') {
          setSorters({ ...sorters, name: 'asc' })
          cookie.set('name', 'asc', { path: '/' })
        } else {
          setSorters({ ...sorters, name: 'desc' })
          cookie.set('name', 'desc', { path: '/' })
        }
        setMovies(
          orderBy(
            movies,
            (movie: any) => {
              return movie.name
            },
            sorters.name,
          ),
        )
        break
      case 'releaseDate':
        if (sorters.releaseDate == 'desc') {
          setSorters({ ...sorters, releaseDate: 'asc' })
          cookie.set('releaseDate', 'asc', { path: '/' })
        } else {
          setSorters({ ...sorters, releaseDate: 'desc' })
          cookie.set('releaseDate', 'desc', { path: '/' })
        }
        setMovies(
          orderBy(
            movies,
            (movie: any) => {
              return movie.releaseDate
            },
            sorters.releaseDate,
          ),
        )
        break
      case 'duration':
        if (sorters.duration == 'desc') {
          setSorters({ ...sorters, duration: 'asc' })
          cookie.set('duration', 'asc', { path: '/' })
        } else {
          setSorters({ ...sorters, duration: 'desc' })
          cookie.set('duration', 'desc', { path: '/' })
        }
        setMovies(
          orderBy(
            movies,
            (movie: any) => {
              return movie.duration
            },
            sorters.duration,
          ),
        )
        break
      case 'actors':
        if (sorters.actors == 'desc') {
          setSorters({ ...sorters, actors: 'asc' })
          cookie.set('actors', 'asc', { path: '/' })
        } else {
          setSorters({ ...sorters, actors: 'desc' })
          cookie.set('actors', 'desc', { path: '/' })
        }
        setMovies(
          orderBy(
            movies,
            (movie: any) => {
              return movie.actors
            },
            sorters.actors,
          ),
        )
        break
      case 'rating':
        if (sorters.rating == 'desc') {
          setSorters({ ...sorters, rating: 'asc' })
          cookie.set('rating', 'asc', { path: '/' })
        } else {
          setSorters({ ...sorters, rating: 'desc' })
          cookie.set('rating', 'desc', { path: '/' })
        }
        setMovies(
          orderBy(
            movies,
            (movie: any) => {
              return movie.rating
            },
            sorters.rating,
          ),
        )
    }
  }

  return (
    <div>
      <React.Fragment>
        <AddEditMovie
          isEdit={isEdit}
          open={open}
          movie={movieToBeEdited}
          onSave={saveMovie}
          onCancel={() => setOpen(false)}
          onOpen={onOpen}
        />
      </React.Fragment>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Name
              <Icon
                onClick={() => handleSorting('name')}
                name={sorters.name === 'desc' ? 'angle down' : 'angle up'}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>
              Release date{' '}
              <Icon
                onClick={() => handleSorting('releaseDate')}
                name={
                  sorters.releaseDate === 'desc' ? 'angle down' : 'angle up'
                }
              />
            </Table.HeaderCell>
            <Table.HeaderCell>
              Duration{' '}
              <Icon
                onClick={() => handleSorting('duration')}
                name={sorters.duration === 'desc' ? 'angle down' : 'angle up'}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>
              Actors
              <Icon
                onClick={() => handleSorting('actors')}
                name={sorters.actors === 'desc' ? 'angle down' : 'angle up'}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>
              Average of rates
              <Icon
                onClick={() => handleSorting('rating')}
                name={sorters.rating === 'desc' ? 'angle down' : 'angle up'}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {movies &&
            movies.map((movie: Movie) => {
              return (
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4" textAlign="left">
                      {movie.name}
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{movie.releaseDate}</Table.Cell>
                  <Table.Cell>{`${movie.duration} min`}</Table.Cell>
                  <Table.Cell textAlign="left">{movie.actors}</Table.Cell>
                  <Table.Cell>
                    <Rating
                      disabled
                      icon="star"
                      rating={movie.rating}
                      maxRating={5}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      icon="trash"
                      onClick={() => {
                        triggerMovieRemoval(movie.id)
                      }}
                      negative
                    />
                    <Button
                      icon="edit"
                      onClick={() => setStateOfTheMovieToBeEdited(movie)}
                    />
                  </Table.Cell>
                </Table.Row>
              )
            })}
          {loading && <div>Loading ...</div>}
        </Table.Body>
      </Table>
    </div>
  )
}

export default GetMovies
