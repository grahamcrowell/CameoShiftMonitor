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