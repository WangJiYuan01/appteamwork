import gql from "graphql-tag";

export default gql`query($filter: FilterFindManyUserInput) {
    customers:userMany(filter: $filter) {
      _id
      firstName
      lastName
      email
      fullName
    }
  }`