import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'
import JobListElement from './JobListElement'
var sprintf = require("sprintf-js").sprintf;
class JobList extends Component {

    // constructor(props) {
    //     super(props);
    //     // this.bind = this.props.bind
    // }

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
        // Object.keys(this.props).foreach(key =>(
        //     console.log(sprintf("this.props.%s=%s", key, this.props[key]))
        // ));
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

        // Object.keys(this.props.match.params).forEach(key => {
        //     // console.log(sprintf("this.props.match.params.%s=?", String(key)));
        //     console.log(sprintf("this.props.match.params.%s=?", String(Object.keys(this.props.match.params))));
        // });

        return (
            <div>
                {this
                    .props
                    .allJobsQuery
                    .allJobs
                    .map(job => (
                        <div id>
                            <h1>{job.jobName}</h1>
                            <JobListElement job={job}/>
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

// const JobPageWithDelete = graphql(DELETE_POST_MUTATION)(JobPageWithGraphQL)

export default JobPageWithGraphQL