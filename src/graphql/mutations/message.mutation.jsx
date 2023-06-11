import { gql } from "@apollo/client"

export const CREATE_MESSAGE = gql`
	mutation createMessage($data: MessageInput!) {
		createMessage(data: $data) {
			id
			contractId
			createdAt
			updatedAt
			senderId
			receiverId
			text
		}
	}
`