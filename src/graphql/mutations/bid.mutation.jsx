import { gql } from '@apollo/client';

export const CREATE_BID = gql`
	mutation createBid($data: String!) {
		createBid(data: $data) {
			id
			contractId
			sellerId
			price
			description
		}
	}
`
