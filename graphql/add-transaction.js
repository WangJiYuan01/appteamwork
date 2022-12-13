import gql from 'graphql-tag';
const query = gql`
mutation($record: CreateOneManualServiceTransactionInput!) {
    ManualServiceTransactionCreateOne(record: $record) {
      recordId
    }
  }
`

export default query;