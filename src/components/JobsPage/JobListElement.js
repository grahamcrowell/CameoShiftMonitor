import React from 'react';
import PropTypes from 'prop-types';
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'
var sprintf = require("sprintf-js").sprintf;
/** renders a JobList element
 *
 * expected props:
 * - jobId: String
 * - job: Job
 *
 */
class JobListElement extends React.Component {
    render() {
        console.log("JobListElement.render()")
        const {job} = this.props;
        // console.log("job.id="+String(job.id)+"\n")
        // console.log("job.Added="+String(job.Added)+"\n")
        return (
            <div id>
                <h3>Job List Element {job.id}</h3>
                <div key={job.id}>
                    <p>jobName={job.jobName}</p>
                    <p>Added={job.Added === true
                            ? "true"
                            : "false"}</p>
                    <button
                        onClick={this.handleDelete}>
                        Add Job To This Shift
                    </button>
                </div>
            </div>
        );
    }

    handleDelete = async() => {
        console.log(sprintf("handleDelete %s", this.props));
        Object.keys(this.props).forEach(key => {
            console.log(sprintf("this.props[%s]=%s", key, String(this.props[key])));
            console.log(sprintf("this.props[%s]=%s", key, String(this.props.job)));
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

const POST_QUERY = gql`
  query PostQuery($id: ID!) {
    Job(id: $id) {
      id
      jobName
    }
  }
`

// JobListElement.propTypes = {
//     job: PropTypes.object.isRequired,
//     id: PropTypes.string.isRequired
// };


const DetailPageWithGraphQL = compose(
    graphql(POST_QUERY, {
      name: 'postQuery',
      // see documentation on computing query variables from props in wrapper
      // http://dev.apollodata.com/react/queries.html#options-from-props
      options: ({match}) => ({
        variables: {
          id: match,
        },
      }),
    }),
    graphql(DELETE_POST_MUTATION, {
      name: 'deleteJobMutation'
    })
  )(JobListElement)

export default graphql(DELETE_POST_MUTATION)(DetailPageWithGraphQL);
