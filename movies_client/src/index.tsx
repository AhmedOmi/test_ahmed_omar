import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import App from './components/app/app.component'
import client from './common/apolloClient'

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
)
