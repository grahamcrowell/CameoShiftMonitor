import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'

class Job extends Component {
    render() {
        if (this.props.allJobsQuery.loading) {
            return (
                <div className='flex w-100 h-100 items-center justify-center pt7'>
                    <div>
                        Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})
                    </div>
                </div>
            )
        }

        const {Jobs} = this.props.allJobsQuery

        return (
            <div>
                {this.props.allJobsQuery.allJobs.map(job => (
                    <h1>{job.jobName}</h1>
                ))}
            </div>
        )
    }
}

const ALL_JOBS_QUERY = gql `
  query AllJobsQuery {
    allJobs {
      jobName
    }
  }
`

const JobPageWithGraphQL = graphql(ALL_JOBS_QUERY, {
    name: 'allJobsQuery',
    // see documentation on computing query variables from props in wrapper
    // http://dev.apollodata.com/react/queries.html#options-from-props
    options: {
        fetchPolicy: 'network-only'
    }
})(Job)

// const JobPageWithDelete = graphql(DELETE_POST_MUTATION)(JobPageWithGraphQL)

export default JobPageWithGraphQL