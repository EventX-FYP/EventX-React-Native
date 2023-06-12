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

export const GET_USERS_BY_LOGIN_ID = gql`
	query getUsersByLoginId($id: String!) {
		getUsersByLoginId(id: $id) {
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
			# recommendation
		}
	}
`;

export const GET_CHATS = gql`
	query getChats($senderId: String!, $receiverId: String!) {
		getChats(
			senderId: $senderId
			receiverId: $receiverId
		) {
			id
			contractId
			# createdAt
			# updatedAt
			senderId
			receiverId
			text
		}
	}
`