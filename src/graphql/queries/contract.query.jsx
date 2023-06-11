import { gql } from "@apollo/client";

export const GET_ALL_CONTRACTS = gql`
	query getAllContracts($userId: String!) {
		getAllContracts(userId: $userId) {
			id
			customerId
			# sellerId
			title
			description
			budget
			categories
			location
			status
		}
	}
`;

export const GET_CONTRACTS = gql`
	query getContracts {
		getContracts {
			id
			customerId
			sellerId
			title
			description
			budget
			categories
			location
			status
		}
	}
`

export const GET_CONTRACT = gql`
	query getContract($id: String!) {
		getContract(id: $id) {
			id
			customerId
			sellerId
			title
			description
			budget
			categories
			location
			status
		}
	}
`