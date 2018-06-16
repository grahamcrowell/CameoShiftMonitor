import React from 'react';
import PropTypes from 'prop-types';
import JobListElement from './JobListElement';

class JobList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("JobList.render()")

        const {jobs} = this.props;

        return (
            <div>
                <h2>Job List</h2>
                {jobs.map(job => <div key={job.JobId}>
                    <JobListElement job={job}/>
                </div>)}
            </div>
        );
    }
}

JobList.propTypes = {
    jobs: PropTypes.array.isRequired
};

export default JobList;
