const express = require('express');
const bodyParser = require('body-parser');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const {makeExecutableSchema} = require('graphql-tools');
const { find, filter } = require('lodash')
var sprintf = require("sprintf-js").sprintf; // string utility library

var cors = require('cors') // fix CORS error
// Some fake data
var jobs = require('./jobs_mock_data.json');
var config = require('../src/config.json');

const GRAPHQL_ENDPOINT = config["GRAPHQL_ENDPOINT"];
const GRAPHQL_PORT = config["GRAPHQL_PORT"];

// The GraphQL schema in string form
const typeDefs = `
type Job {
    JobId: String,
    JobNumber: String,
    CustomerId: String,
    Added: Boolean
}
type Query { 
    jobs: [Job]
    getJob(jobId: String!): Job
}

type Mutation {
    toggleJob (
        JobId: String!
    ): Job
}
`;

// The resolvers
const resolvers = {
    Query: {
        jobs: () => jobs,
        getJob: (_, {jobId}) => {
            const job = find(jobs, {JobId: jobId});
            if (!job) {
                throw new Error(`Couldn't find job with JobId ${jobId}`);
            }
            return job;
        }
    },
    // https://www.apollographql.com/docs/graphql-tools/generate-schema.html
    Mutation: {
        toggleJob: (_, {JobId}) => {
            const job = find(jobs, {JobId: JobId});
            if (!job) {
                throw new Error(`Couldn't find job with JobId ${JobId}`);
            }
            job.Added = !job.Added;
            return job;
        }
    }
};

/*
goto: server page: http://localhost:3000/graphiql
try these graph ql examples:

query GET_JOB($jobId_var: String!) {
  getJob(jobId: $jobId_var) {
    JobId
  }
}

query GET_JOBS {
  jobs {
    JobId
    JobNumber
    CustomerId
    Added
  }
}

mutation TOGGLE_JOB($jobId_var: String!) {
  toggleJob(JobId: $jobId_var) {
    JobId
  }
}


// query variables
{
  "jobId_var": "J01-guid"
}
*/

// Put together a schema
const schema = makeExecutableSchema({typeDefs, resolvers});

// Initialize the app
const app = express();

// fix CORS error:
// https://blog.graph.cool/enabling-cors-for-express-graphql-apollo-server-1ef99
// 9 bfb38d
app.use(cors())

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

// Start the server
app.listen(GRAPHQL_PORT, () => {
    let message = sprintf("Go to %s/graphiql to run queries!",GRAPHQL_ENDPOINT)
    console.log(message);
});