var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var { printIntrospectionSchema } = require('graphql');
/** Return object instead of array from a GraphQL query
 * https://graphql.org/graphql-js/object-types/
 * 
 */

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`from

  type Job {
      JobId: String!
      JobName: String
      CustomerId: String
      Added: Boolean
  }

  type Jobs {
    getJob(JobId: String!): Job
  }
  
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
    
  }

  type Query {
    getDie(numSides: Int): RandomDie
    getJobs: Jobs
  }
`);
// This class implements the RandomDie GraphQL type
class RandomDie {
    constructor(numSides) {
      this.numSides = numSides;
    }
  
    rollOnce() {
      return 1 + Math.floor(Math.random() * this.numSides);
    }
  
    roll({numRolls}) {
      var output = [];
      for (var i = 0; i < numRolls; i++) {
        output.push(this.rollOnce());
      }
      return output;
    }
    getJobs({JobID})
  }
  
// This class implements the RandomDie GraphQL type
class Jobs {
    constructor() {
    //   this.numSides = numSides;
    }
  
    rollOnce() {
      return 1 + Math.floor(Math.random() * this.numSides);
    }
  
    roll({numRolls}) {
      var output = [];
      for (var i = 0; i < numRolls; i++) {
        output.push(this.rollOnce());
      }
      return output;
    }
    getJobs({JobID})
  }
  

// The root provides the top-level API endpoints
var root = {
  getDie: function ({numSides}) {
    return new RandomDie(numSides || 6);
  }
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
