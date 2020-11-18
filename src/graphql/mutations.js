/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createShift = /* GraphQL */ `
  mutation CreateShift(
    $input: CreateShiftInput!
    $condition: ModelShiftConditionInput
  ) {
    createShift(input: $input, condition: $condition) {
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
export const updateShift = /* GraphQL */ `
  mutation UpdateShift(
    $input: UpdateShiftInput!
    $condition: ModelShiftConditionInput
  ) {
    updateShift(input: $input, condition: $condition) {
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
export const deleteShift = /* GraphQL */ `
  mutation DeleteShift(
    $input: DeleteShiftInput!
    $condition: ModelShiftConditionInput
  ) {
    deleteShift(input: $input, condition: $condition) {
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
export const createJob = /* GraphQL */ `
  mutation CreateJob(
    $input: CreateJobInput!
    $condition: ModelJobConditionInput
  ) {
    createJob(input: $input, condition: $condition) {
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
export const updateJob = /* GraphQL */ `
  mutation UpdateJob(
    $input: UpdateJobInput!
    $condition: ModelJobConditionInput
  ) {
    updateJob(input: $input, condition: $condition) {
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
export const deleteJob = /* GraphQL */ `
  mutation DeleteJob(
    $input: DeleteJobInput!
    $condition: ModelJobConditionInput
  ) {
    deleteJob(input: $input, condition: $condition) {
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
export const registerUser = /* GraphQL */ `
  mutation RegisterUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    registerUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
