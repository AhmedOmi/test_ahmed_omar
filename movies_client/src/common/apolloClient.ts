import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const errorLink = onError((errorLink) => {
  const graphQLErrors = errorLink.graphQLErrors
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      console.log(`${message}`)
    })
  }
})
const link = from([
  errorLink,
  new HttpLink({ uri: 'http://localhost:3000/graphql' }),
])
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
})

export default client
