import React, { Component } from 'react';
import {BookList, AddBook} from './components'
import ApolloClient from 'apollo-boost'
import {URI} from './lib/constants'
import {ApolloProvider} from 'react-apollo'

//Apollo Client setup
const client = new ApolloClient({
  uri: URI
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Reading List:</h1>
          <BookList/>
          <AddBook/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
