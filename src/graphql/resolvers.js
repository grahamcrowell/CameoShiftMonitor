import gql from 'graphql-tag';

/**
 * ???
 * MAYBE NOT USEFUL
 * could be passed to withClientState
 * in App.js ApolloClient
 * ???
 */
export const resolvers = {
  Mutation: {
    toggleJob: (_, variables, { cache }) => {
      console.log("Mutation toggleJob")
      const id = `JobId:${variables.JobId}`;
      const fragment = gql`
        fragment addJob on Job {
          Added
        }
      `;
      const new_state = cache.readFragment({ fragment, id });
      const data = { ...new_state, Added: !new_state.Added };
      cache.writeData({ id, data });
      return null;
    },
  },
};
