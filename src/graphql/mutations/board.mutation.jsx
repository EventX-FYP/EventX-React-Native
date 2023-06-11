import { gql } from "@apollo/client";

export const CREATE_BOARD = gql`
	mutation createBoard($data: BoardInput!) {
		createBoard(data: $data) {
			id
			contractId
			name
		}
	}
`