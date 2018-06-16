import React from 'react';
import PropTypes from 'prop-types';
import {Query, Mutation} from 'react-apollo';
import {GET_JOBS} from '../../graphql/queries';
import {TOGGLE_JOB} from '../../graphql/resolvers';
class JobListElement extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("JobListElement.render()")
        const {job} = this.props;
        const {JobId} = job.JobId
        const {Added} = job.Added

        return (
            <div>
                <h3>Job List Element {job.JobId}</h3>
                <Mutation mutation={TOGGLE_JOB} 
                                            
                                            key={JobId}
                                            update={(cache, { job: { updateJob } }) => {
                                                console.log("button PRESSED -> Mutate: JobId="+String(JobId)+"\n")
                                                console.log("job.JobId="+String(job.JobId)+"\n")
                                                console.log("job.Added="+String(job.Added)+"\n")
                                                const { jobs } = cache.readQuery({ query: GET_JOBS });
                                                
                                                let key = 0;
                                                while (key<jobs.length) {
                                                    if(jobs[key].JobId === JobId) {
                                                        break
                                                    }
                                                    else {
                                                        key ++;
                                                    }
                                                }
                                                
                                                jobs[key].Added=!jobs[key].Added
                                                cache.writeQuery({
                                                  query: GET_JOBS,
                                                  data: {"jobs":jobs}
                                                });
                                              }}
                                            >
                                            {updateJob => (
                                                <div key={JobId}>
                                                    <p>key={JobId}</p>
                                                    <p>Added={Added === true ? "true": "false"}</p>
                                                    <button onClick={e => {
                                                          e.preventDefault();
                                                          updateJob({ variables: { JobId } });
                                                        }}>
                                                        Add Job To This Shift
                                                    </button>
                                                </div>
                                            )}
                                        </Mutation>
            </div>
        );
    }
}

JobListElement.propTypes = {
    job: PropTypes.object.isRequired
};

export default JobListElement;
