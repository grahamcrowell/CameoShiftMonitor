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
  query get_job($jobId: String!) {
    getJob(jobId: String!) {
      JobId
      JobNumber
      CustomerId
      Added
    }
  }
`;
