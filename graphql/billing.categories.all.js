import gql from 'graphql-tag';
const query = gql`
query {
    categories: BillingCategoryMany {
      _id
      basePrice
      name
      tag
      group
    }
  }
`

export default query;