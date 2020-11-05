/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getShift = /* GraphQL */ `
  query GetShift($id: ID!) {
    getShift(id: $id) {
      id
      date
      amount
      inTime
      outTime
      tags
      createdAt
      updatedAt
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
        date
        amount
        inTime
        outTime
        tags
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
