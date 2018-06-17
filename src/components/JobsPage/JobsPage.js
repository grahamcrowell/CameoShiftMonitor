import React, {Component} from 'react';
import {Query} from 'react-apollo';
import {GET_JOBS} from '../../graphql/queries';
import JobList from './JobList'


class JobPage extends Component {
    render() {
        console.log("JobPage.render()")
        return (
            <div>
            <h1>JobsPage</h1>,
            <Query query={GET_JOBS}>
                {({loading, error, data}) => {
                    if (loading) 
                        return <p>Loading...</p>;
                    if (error) 
                        return <p>Error :(</p>;
                    else 
                        return <div>
                            <JobList jobs={data.jobs}/>
                        </div>
                }}
            </Query>
            </div>
        );
    }
}

export default JobPage