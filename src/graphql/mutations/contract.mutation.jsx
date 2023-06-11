import { gql } from '@apollo/client';

export const ACCEPT_BID = gql`
	mutation acceptBid($sellerId: String!, $contractId: String!) {
		acceptBid(sellerId: $sellerId, contractId: $contractId) {
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

export const CREATE_CONTRACT = gql`
	mutation createContract($data: String!) {
		createContract(data: $data) {
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
`

export const UPDATE_CONTRACT = gql`
	mutation updateContract($data: ContractUpdateInput!) {
		updateContract(data: $data) {
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

export const DELETE_CONTRACT = gql`
	mutation deleteContract($id: String!) {
		deleteContract(id: $id) {
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