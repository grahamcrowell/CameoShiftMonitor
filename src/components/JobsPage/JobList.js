import React, {Component} from 'react';
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import JobListElement from './JobListElement'
var sprintf = require("sprintf-js").sprintf;

class JobList extends Component {

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

        console.log(sprintf("this.props = %s", String(this.props)));
        Object.keys(this.props).forEach(key => {
            console.log(sprintf("this.props.%s=...", String(key)));
        });
        console.log(sprintf("this.props.allJobsQuery=%s", String(this.props.allJobsQuery)));
        console.log(sprintf("this.props.allJobsQuery.allJobs=%s", String(this.props.allJobsQuery.allJobs)));
        Object.keys(this.props.allJobsQuery.allJobs).forEach(key => {
            console.log(sprintf("this.props.allJobsQuery.allJobs.%s=?", String(key)));
        });
        console.log(sprintf("this.props.match=%s", String(this.props.match)));
        Object.keys(this.props.match).forEach(key => {
            console.log(sprintf("this.props.match.%s=?", String(key)));
        });
        console.log(sprintf("this.props.match.params=%s", String(this.props.match.params.length)));
        console.log(sprintf("this.props.match.params=%s", String(this.props.match.params)));

        return (
            <div>
                {this
                    .props
                    .allJobsQuery
                    .allJobs
                    .map(job => (
                        <div key={job.id}>
                            <h1>{job.jobName}</h1>
                            <JobListElement key={job.id} job={job}/>
                        </div>
                    ))}
            </div>
        )
    }
}

const ALL_JOBS_QUERY = gql `
  query AllJobsQuery {
    allJobs {
        id
        jobName
        trusses {
            id
            trussName
        }
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
})(JobList)

export default JobPageWithGraphQL