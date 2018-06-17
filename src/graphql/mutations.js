import gql from 'graphql-tag';

/** declares mutation that is resolved/implemented 
 * on server (see server.js)
 * and locally (see resolvers.js)
 * @argument JobId identifies the job to added or removed from the shift
 */
export const TOGGLE_JOB = gql `
mutation toggleJob($JobId: String!) {
  toggleJob(JobId: $JobId) {
      JobId
      JobNumber
      CustomerId
      Added
  }
}
`;