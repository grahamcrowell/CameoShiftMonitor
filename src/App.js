// react
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
// apollo
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";
import {withClientState} from 'apollo-link-state';
import {InMemoryCache} from 'apollo-cache-inmemory';
// utility
import {sprintf} from "sprintf-js"; // string utility library

import './App.css';
// my code
import JobPageWithGraphQL from './components/JobsPage/JobList'

// Apollo cache stores local state
const cache = new InMemoryCache();

const graphql_endpoint = "https://api.graph.cool/simple/v1/cjf1zqzvy2n6w0151dfxo8ny6";
console.log(sprintf("graphql endpoint: %s", graphql_endpoint));

const client = new ApolloClient({
  cache,
  uri: graphql_endpoint,
  link: withClientState({ cache }),
});

// App entry point
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Route exact={true} path="/" component={JobPageWithGraphQL}/>
          </div>
        </Router>
      </ApolloProvider>

    );
  }
}

export default App;
