import gql from "graphql-tag";

export const GET_JOBS = gql `
{
  jobs {
    JobId
    JobNumber
    CustomerId
    Added
  }
}
`;

export const GET_JOB = gql `
  query getJob($jobId: String!) {
    getJob(jobId: $jobId) {
      JobId
      JobNumber
      CustomerId
      Added
    }
  }
`;

