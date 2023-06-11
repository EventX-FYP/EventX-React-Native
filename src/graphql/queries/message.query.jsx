import { gql } from "@apollo/client";

export const GET_USERS_BY_SENDER_ID = gql`
	query getUsersBySenderId($id: String!) {
		getUsersBySenderId(id: $id) {
			id
			createdAt
			updatedAt
			name
			email
			password
			picture
			role
			categories
			birthday
			gender
			phone
			address
			city
			country
			accessToken
			recommendation
		}
	}
`

export const GET_CHATS = gql`
	query getChats($contractId: String!) {
		getChats(contractId: $contractId) {
			id
			createdAt
			updatedAt
			senderId
			receiverId
			text
		}
	}
`