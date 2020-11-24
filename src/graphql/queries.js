/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getShift = /* GraphQL */ `
  query GetShift($id: ID!) {
    getShift(id: $id) {
      id
      createdAt
      amount
      inTime
      outTime
      hours
      tags
      job
      user {
        id
        username
        email
        verified
        shifts {
          nextToken
        }
        jobs {
          nextToken
        }
        createdAt
        updatedAt
      }
      updatedAt
      owner
    }
  }
`;
export const listShifts = /* GraphQL */ `
  query ListShifts(
    $filter: ModelShiftFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShifts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        amount
        inTime
        outTime
        hours
        tags
        job
        user {
          id
          username
          email
          verified
          createdAt
          updatedAt
        }
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getJob = /* GraphQL */ `
  query GetJob($id: ID!) {
    getJob(id: $id) {
      id
      jobTitle
      jobWage
      storeName
      storeAddress {
        city
        country
        address_line1
        address_line2
        address_state
        address_zip
      }
      user {
        id
        username
        email
        verified
        shifts {
          nextToken
        }
        jobs {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listJobs = /* GraphQL */ `
  query ListJobs(
    $filter: ModelJobFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        jobTitle
        jobWage
        storeName
        storeAddress {
          city
          country
          address_line1
          address_line2
          address_state
          address_zip
        }
        user {
          id
          username
          email
          verified
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      verified
      shifts {
        items {
          id
          createdAt
          amount
          inTime
          outTime
          hours
          tags
          job
          updatedAt
          owner
        }
        nextToken
      }
      jobs {
        items {
          id
          jobTitle
          jobWage
          storeName
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
