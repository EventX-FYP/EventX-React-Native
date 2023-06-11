import { gql } from "@apollo/client";

export const NEW_MESSAGE = gql`
	subscription newMessage($contractId: String!) {
		newMessage(contractId: $contractId) {
			id
			contractId
			createdAt
			updatedAt
			senderId
			receiverId
			text
		}
	}
`;