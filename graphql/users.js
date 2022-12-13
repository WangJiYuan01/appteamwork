import gql from "graphql-tag";

export default gql`query($filter: FilterFindManyUserInput) {
    userMany:userMany(filter: $filter) {
        _id
      firstName
      lastName
      email
      fullName
      profile {
        sellerCode
        companyName
      }
    }
  }`