import { gql } from "@apollo/client";

export const GET_ALL_BOARDS = gql`
	query getAllBoards($userId: String!) {
		getAllBoards(userId: $userId) {
			id
			contractId
			name
		}
	}
`