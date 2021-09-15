import React, { useState } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { useMutation } from '@apollo/client'
import { AUTH, REGISTER } from '../../GraphQl/Mutations'
import { UserInfo } from '../../common/interfaces'
import Cookies from 'universal-cookie'
import GetMovies from '../movies/GetMovies'
const Auth = () => {
  const [login] = useMutation(AUTH)
  const [register] = useMutation(REGISTER)
  const [isAuthorized, setIsAuthorized] = useState(
    new Cookies().get('Autharized'),
  )
  const [user, setUser] = useState<UserInfo>({
    username: undefined,
    password: undefined,
  })
  const [errorText, setErrorText] = useState<Record<string, string>>({
    title: '  You must register before you can do that!',
    text:
      'please register by filling the needed infos on the form above and click the register button',
  })
  async function loginUser(user: UserInfo) {
    try {
      if (!user.username) {
        throw new Error('Email is missing')
      }
      if (!user.password) {
        throw new Error('Password is missing')
      }
      const { data, errors } = await login({
        variables: {
          username: user.username,
          password: user.password,
        },
      })
      if (errors) {
        setErrorText({
          title: errors[0].message,
          text: 'Please check your data before login',
        })
      }
      if (data) {
        const cookie = new Cookies()
        cookie.set('Autharized', data.login.token, { path: '/' })
        setIsAuthorized(data.login.token)
      }
    } catch (error) {
      setErrorText({ title: 'Invalid data!', text: `${error}` })
    }
  }

  async function createAccount(user: UserInfo) {
    try {
      if (!user.username) {
        throw new Error('Email is missing')
      }
      if (!user.password) {
        throw new Error('Password is missing')
      }
      const { data } = await register({
        variables: {
          username: user.username,
          password: user.password,
        },
      })
      setErrorText({
        title: 'Account created ',
        text: 'please login with the same infos of the account created',
      })
    } catch (error) {
      setErrorText({ title: 'Invalid data!', text: `${error}` })
    }
  }

  return (
    <div>
      {isAuthorized ? (
        <React.Fragment>
          <GetMovies />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Form>
            <Form.Field>
              <label>email</label>
              <input
                type="email"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                required={true}
                placeholder="email"
              />
            </Form.Field>
            <Form.Field>
              <label>password</label>
              <input
                type="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="please type your password"
              />
            </Form.Field>

            <Button
              onClick={() => loginUser(user)}
              className="primary"
              type="submit"
            >
              Login
            </Button>
            <Button onClick={() => createAccount(user)} type="submit">
              Register please
            </Button>
          </Form>
          <Message warning>
            <Message.Header>{errorText.title}</Message.Header>
            <p>{errorText.text}</p>
          </Message>
        </React.Fragment>
      )}
    </div>
  )
}

export default Auth
