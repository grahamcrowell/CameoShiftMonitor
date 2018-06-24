import React from 'react';
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'
var sprintf = require("sprintf-js").sprintf;

class JobListElement extends React.Component {
    render() {
        console.log("JobListElement.render()")
        const {job} = this.props;
        // console.log("job.id="+String(job.id)+"\n")
        // console.log("job.Added="+String(job.Added)+"\n")
        return (
            <div key={job.id}>
                <h3>Job List Element {job.jobName}</h3>
                <p>jobName={job.jobName}</p>
                <button
                    onClick={this.handleDelete}>
                    Add Job To This Shift
                </button>
            </div>
        );
    }

    handleDelete = async() => {
        console.log(sprintf("handleDelete %s", this.props));
        Object.keys(this.props).forEach(key => {
            console.log(sprintf("this.props.%s", key, String(this.props.job)));
        });
        await this
            .props
            .deleteJobMutation({
                variables: {
                    id: this.props.job.id
                }
            })
        this
            .props
            .history
            .replace('/')
    }
}

const DELETE_POST_MUTATION = gql`
  mutation DeleteJobMutation($id: ID!) {
    deleteJob(id: $id) {
      id
    }
  }
`

const DetailPageWithGraphQL = graphql(DELETE_POST_MUTATION, {
  name: 'deleteJobMutation'
})(JobListElement)
const JobElement = graphql(DELETE_POST_MUTATION)(DetailPageWithGraphQL);

export default withRouter(JobElement);
