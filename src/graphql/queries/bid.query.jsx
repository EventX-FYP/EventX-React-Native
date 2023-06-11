import { gql } from "@apollo/client";

export const GET_ALL_BIDS = gql`
	query getAllBids($contractId: String!) {
		getAllBids(contractId: $contractId) {
			id
			contractId
			sellerId
			price
			description
		}
	}
`