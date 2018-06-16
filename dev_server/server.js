const express = require('express');
const bodyParser = require('body-parser');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const {makeExecutableSchema} = require('graphql-tools');
const { find, filter } = require('lodash')
var cors = require('cors') // fix CORS error

// Some fake data
var jobs = require('./jobs_mock_data.json');

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

query GetJob {
  jobs {
    JobId
  }
}

query GetAllJobs {
  jobs {
    JobId
    JobNumber
    CustomerId
  Added
  }
}

mutation AddJob($jobId_var: String!) {
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
app.listen(3000, () => {
    console.log('Go to http://localhost:3000/graphiql to run queries!');
});