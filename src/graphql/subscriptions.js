/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateShift = /* GraphQL */ `
  subscription OnCreateShift($owner: String!) {
    onCreateShift(owner: $owner) {
      id
      createdAt
      amount
      inTime
      outTime
      hours
      tags
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
export const onUpdateShift = /* GraphQL */ `
  subscription OnUpdateShift($owner: String!) {
    onUpdateShift(owner: $owner) {
      id
      createdAt
      amount
      inTime
      outTime
      hours
      tags
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
export const onDeleteShift = /* GraphQL */ `
  subscription OnDeleteShift($owner: String!) {
    onDeleteShift(owner: $owner) {
      id
      createdAt
      amount
      inTime
      outTime
      hours
      tags
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
export const onCreateJob = /* GraphQL */ `
  subscription OnCreateJob($owner: String!) {
    onCreateJob(owner: $owner) {
      id
      jobTitle
      jobWage
      storeName
      storeAddress {
        city
        country
        address_line1
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
export const onUpdateJob = /* GraphQL */ `
  subscription OnUpdateJob($owner: String!) {
    onUpdateJob(owner: $owner) {
      id
      jobTitle
      jobWage
      storeName
      storeAddress {
        city
        country
        address_line1
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
export const onDeleteJob = /* GraphQL */ `
  subscription OnDeleteJob($owner: String!) {
    onDeleteJob(owner: $owner) {
      id
      jobTitle
      jobWage
      storeName
      storeAddress {
        city
        country
        address_line1
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
