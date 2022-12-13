import gql from 'graphql-tag';
const query = gql`
query OrderPagination($page: Int, $perPage: Int, $sort: SortFindManyOrderInput, $filter: FilterFindManyOrderInput) {
    orders: orderPagination(page: $page, perPage: $perPage, sort: $sort, filter: $filter) {
      count
      pageInfo {
        currentPage
        hasNextPage
        perPage
        pageCount
        itemCount
        hasPreviousPage
      }
      items {
        _id
        resend
        trackingStatus
        trackingStatusReason
        trackingStatusMessage        
        isCombinable
        externalOrderId
        internalOrderId
        lastStatus
        isExpress
        internalOrderId
        combinableCount
        fullAddress
        orderInternalStatus
        collectionPointDelivery
        orderDate
        shipmentInvoices {
          _id
         invoice {
            _id
            shipment
            selectedProvider
            status
            ratings {
              _id
              shippingInvoiceId
              providerId
              userPriceTotal
              parceled
              rated
              parcels
              rating
              status
              error
              message
              provider {
                serviceName
                shortName
              }
            }
          }
          shippingInvoiceId
        }        
        user {
          _id
          firstName
          lastName
        }
        items {
          _id
          quantity
          price
          sku
          product {
            name
            userId
            barcode
            sku
            dimensions {
              length
              depth
              width
              weight
              height
            }
            status
            package {
              height
              width
              depth
              length
            }
            itemPerPack
            _id
            updatedAt
            createdAt
            fullName
            quantity
          }
        }
        user {
          _id
          firstName
          lastName
          fullName
        }
        customer {
          firstName
          middleName
          lastName
          email
          email2
          phone
          phone2
          addressLine1
          addressLine2
          addressLine3
          city
          state
          country
          postcode          
        }
        shipmentInvoices {
          _id
        }
        CustomerFullName
        store {
          _id
          name
          connectorId 
          connector {
            _id
            name
            logo
          }
        }   
        userId
        orderId
        storeId
      }
    }
  }
`

export default query;