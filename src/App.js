// react
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
// apollo
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";
import {withClientState} from 'apollo-link-state';
import {InMemoryCache} from 'apollo-cache-inmemory';
// my code
import './App.css';
import JobsPage from './components/JobsPage/JobsPage'
import { resolvers }  from './graphql/resolvers'

// type Job @client {
//   JobId: String!,
//   JobNumber: String,
//   CustomerId: String,
//   Added: Boolean
// }

const typeDefs = `
  type Query {
    jobs: [Job]
  }
`;

// set initial state (not used - state read from GraphQL server at start up)
// const defaults = {
//   jobs: [
//     {
//       JobId: "J01-guid",
//       JobNumber: "J1801",
//       CustomerId: "customer-guid",
//       Added: false,
//       __typename: "Job"
//     },
//   ]
// }

// Apollo cache to local state
const cache = new InMemoryCache();
// init apollo graphql client
const client = new ApolloClient({
  cache,
  uri: "http://localhost:3000/graphql", // local dev server (see dev_server folder)
  link: withClientState({ resolvers, cache, typeDefs }),
});

// App entry point
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Route exact={true} path="/" component={JobsPage}/>
            <Route exact={true} path="/Jobs" component={JobsPage}/>
          </div>
        </Router>
      </ApolloProvider>

    );
  }
}

export default App;
