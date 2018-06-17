import React, {Component} from 'react';
import {Query, Mutation} from 'react-apollo';
import {GET_JOBS} from '../../graphql/queries';
import {TOGGLE_JOB} from '../../graphql/mutations';


/** DEPRECATED
 * monolithic Page component with a list

 * @class JobPage
 * @extends {Component}
 */
class JobPage extends Component {
    render() {
        console.log("JobPage.render()")
        return (
            <Query query={GET_JOBS}>
                {({loading, error, data}) => {
                    if (loading) 
                        return <p>Loading...</p>;
                    if (error) 
                        return <p>Error :(</p>;
                    else 
                        return <div>
                            {data
                                .jobs
                                .map(({JobId, Added}) => {
                                    return (
                                        <Mutation mutation={TOGGLE_JOB} 
                                            key={JobId}
                                            update={(cache, { data: { updateJob } }) => {
                                                console.log("button PRESSED -> Mutate: JobId="+String(JobId)+"\n")
                                                Object.keys(data.jobs).map((key)=> {
                                                    console.log("jobs["+key+"]:\n")
                                                    console.log("jobs["+key+"].JobId="+String(data.jobs[key].JobId)+"\n")
                                                    console.log("jobs["+key+"].Added="+String(data.jobs[key].Added)+"\n")
                                                    return key;
                                                });
                                                const { jobs } = cache.readQuery({ query: GET_JOBS });
                                                let key = 0;
                                                while (key<data.jobs.length) {
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
                                    )
                                })}
                        </div>
                }}
            </Query>
        );
    }
}
export default JobPage