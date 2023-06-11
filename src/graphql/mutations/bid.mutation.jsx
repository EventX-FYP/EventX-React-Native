import { gql } from '@apollo/client';

export const CREATE_BID = gql`
	mutation createBid($data: BidInput!) {
		createBid(data: $data) {
			id
			contractId
			sellerId
			price
			description
		}
	}
`
