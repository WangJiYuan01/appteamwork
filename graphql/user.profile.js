import gql from 'graphql-tag';
const query = gql`
query($id: MongoID!) {
  user:userById(_id: $id) {
      _id
      profile {
          userId
          BPCode
          sellerCode
          companyName
          creditLimit
          abn
          unit
          address1
          address2
          postcode
          city
          state
          country
          phone
          email
          websiteUrl
          billingAddress {
            unit
            address1
            address2
            postcode
            state
            city
            phone
            country
            email
            emailVerifiedAt
            phoneVerifiedAt
            _id
          }
          billingProfileId
          emailVerifiedAt
          phoneVerifiedAt
          _id
          updatedAt
          createdAt
          isPhoneVerified
          isEmailVerified
          isBillingPhoneVerified
          isBillingEmailVerified
          address
        billingProfile {
          name
          categories {
            setPrice
            tag
            enabled
          }
          _id
          updatedAt
          createdAt
        }
      }
    firstName
  }
}
`

export default query;