import React from 'react';
import PropTypes from 'prop-types';
import JobListElement from './JobListElement';


class JobList extends React.Component {
    render() {
        console.log("JobList.render()")
        const {jobs} = this.props;
        return (
            <div>
                <h2>Job List</h2>
                {jobs.map(job => 
                    /** render a JobListElement component for each Job object */
                    <div key={job.JobId}>
                        <JobListElement key={job.JobId} job={job} jobId={job.JobId}/>
                    </div>
                )}
            </div>
        );
    }
}

JobList.propTypes = {
    jobs: PropTypes.array.isRequired
};

export default JobList;
