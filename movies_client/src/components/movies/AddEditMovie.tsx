import { useState } from 'react'
import { Button, Form, Modal, Rating, RatingProps } from 'semantic-ui-react'
import { Movie } from '../../common/interfaces'

//styles related files
import 'react-datepicker/dist/react-datepicker.css'

interface Props {
  isEdit: boolean
  movie: Movie
  open: boolean
  onSave: (movieToBeChanged: Movie) => void
  onCancel: () => void
  onOpen: (open: boolean) => void
}
function AddEditMovie(props: Props) {
  const [movieToBeEdited, setMovieToBeEdited] = useState<Movie>(props.movie)
  function onAddEditMovie() {
    if (props.isEdit) {
      const updatedMovie = {
        id: props.movie.id,
        name:
          movieToBeEdited.name !== props.movie.name &&
          movieToBeEdited.name !== ''
            ? movieToBeEdited.name
            : props.movie.name,
        releaseDate:
          movieToBeEdited.releaseDate !== props.movie.releaseDate &&
          movieToBeEdited.releaseDate !== ''
            ? movieToBeEdited.releaseDate
            : props.movie.releaseDate,
        duration:
          movieToBeEdited.duration !== props.movie.duration &&
          movieToBeEdited.duration !== 0
            ? movieToBeEdited.duration
            : props.movie.duration,
        actors:
          movieToBeEdited.actors !== props.movie.actors &&
          movieToBeEdited.actors !== ''
            ? movieToBeEdited.actors
            : props.movie.actors,
        rating:
          movieToBeEdited.rating !== props.movie.rating &&
          movieToBeEdited.rating !== 0
            ? movieToBeEdited.rating
            : props.movie.rating,
      }
      props.onSave(updatedMovie)
    } else {
      props.onSave(movieToBeEdited)
    }
  }

  return (
    <div>
      <Modal
        centered={false}
        open={props.open}
        trigger={<Button onClick={() => props.onOpen(true)}>Add movie</Button>}
      >
        <Modal.Header>
          {props.movie?.name !== '' ? 'Edit Movie' : 'Add movie'}
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Name of the movie</label>
              <input
                type="text"
                required={true}
                placeholder="Type the name of the movie"
                defaultValue={props.movie.name}
                onChange={(e) =>
                  setMovieToBeEdited({
                    ...movieToBeEdited,
                    name: e.target.value,
                  })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Release date</label>
              <input
                type="date"
                id="start"
                name="release date"
                defaultValue={props.movie.releaseDate}
                onChange={(e) =>
                  setMovieToBeEdited({
                    ...movieToBeEdited,
                    releaseDate: e.target.value,
                  })
                }
              ></input>
            </Form.Field>
            <Form.Field>
              <label>Duration</label>
              <input
                type="number"
                defaultValue={props.movie.duration}
                placeholder="Type the duration of the movie"
                onChange={(e) => {
                  const durationToBeSet = parseInt(e.target.value)
                  setMovieToBeEdited({
                    ...movieToBeEdited,
                    duration: durationToBeSet,
                  })
                }}
              />
            </Form.Field>
            <Form.Field>
              <label>Name of the actors</label>
              <input
                type="text"
                defaultValue={props.movie.actors}
                placeholder="Separte the name of the actors by comma"
                onChange={(e) =>
                  setMovieToBeEdited({
                    ...movieToBeEdited,
                    actors: e.target.value,
                  })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Rate the movie</label>
              <Rating
                defaultRating={props.movie.rating}
                icon="star"
                maxRating={5}
                onRate={(_, data) => {
                  setMovieToBeEdited({
                    ...movieToBeEdited,
                    rating: data.rating,
                  })
                }}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => onAddEditMovie()}>Save</Button>
          <Button onClick={() => props.onCancel()}>Cancel</Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default AddEditMovie
