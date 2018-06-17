import React from 'react';
import PropTypes from 'prop-types';
import { Mutation} from 'react-apollo';
import {GET_JOBS} from '../../graphql/queries';
import {TOGGLE_JOB} from '../../graphql/mutations';

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
        const {jobId, job} = this.props;
        console.log("job.JobId="+String(job.JobId)+"\n")
        console.log("job.Added="+String(job.Added)+"\n")
        return (
            <div>
                <h3>Job List Element {job.JobId}</h3>
                <Mutation mutation={TOGGLE_JOB} 
                    key={jobId}
                    /** 
                     * update prop applies mutation to local state by updating Apollo cache 
                     * @prop toggleJobFunc is a "?function placeholder?" that forwards params to TOGGLE_JOB
                     * 
                    */
                    update={(cache, { data: { toggleJobFunc } }) => {
                        console.log("Mutate: JobId=%s from current value: Added=%s\n",String(job.JobId),String(job.Added))
                        /** get copy of current state (ie before button click) by querying the cache */
                        const { jobs } = cache.readQuery({ query: GET_JOBS });
                        /** find index of current job in jobs array */
                        let current_job_index = 0;
                        while (current_job_index<jobs.length) {
                            if(jobs[current_job_index].JobId === job.JobId) {
                                break
                            }
                            else {
                                current_job_index ++;
                            }
                        }
                        /** update Added attribute of current job in jobs array */
                        jobs[current_job_index].Added=!jobs[current_job_index].Added
                        /** update state by writing updated jobs array to cache */
                        cache.writeQuery({
                          query: GET_JOBS,
                          data: {"jobs":jobs}
                        });
                      }
                    }
                    >
                    {toggleJobFunc => (
                        /** render HTML text elements and button */
                        <div key={job.JobId}>
                            <p>JobId={job.JobId}</p>
                            <p>Added={job.Added === true ? "true": "false"}</p>
                            <button onClick={e => {
                                e.preventDefault();
                                /** render HTML text elements and button */
                                toggleJobFunc({ variables: { JobId:jobId } });
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
    job: PropTypes.object.isRequired,
    jobId: PropTypes.string.isRequired
};

export default JobListElement;
