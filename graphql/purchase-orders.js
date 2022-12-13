import gql from "graphql-tag";

export default gql`query($filter: FilterFindManyPurchaseOrderInput) {
    purchaseOrders:purchaseOrderMany(filter: $filter) {
    _id
      poInternal
      poCustomer
      dateOfReceiving
      receivier
      palletQuantity
      vendorId
      vendorName
      status
      userId
      user {
      firstName
      lastName
      email
      fullName
    }      
    }
  }`