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

// my code
import './App.css';
import JobsPageComplete from './components/JobsPage/JobsPageComplete'
import JobPageWithGraphQL from './components/JobsPage/JobList'

var config = require('./config.json');
const GRAPHQL_ENDPOINT = config["GRAPHQL_ENDPOINT"];
const GRAPHQL_PORT = config["GRAPHQL_PORT"];

/** Client side schema (optional)
 * https://www.apollographql.com/docs/react/essentials/local-state.html#schema
 */
const typeDefs = `
  type Query {
    jobs: [Job]
    getJob(jobId: String!): Job
  }
`;

// Apollo cache stores local state
const cache = new InMemoryCache();

const graphql_endpoint = "https://api.graph.cool/simple/v1/cjf1zqzvy2n6w0151dfxo8ny6";
console.log(graphql_endpoint);
// init apollo graphql client
const client = new ApolloClient({
  cache,
  uri: graphql_endpoint, // local dev server (see dev_server folder)
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
            <Route exact={true} path="/JobsComplete" component={JobsPageComplete}/>
          </div>
        </Router>
      </ApolloProvider>

    );
  }
}

export default App;
