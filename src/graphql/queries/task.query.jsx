import { gql } from "@apollo/client";

export const GET_TASKS = gql`
	query getTasks($boardId: String!) {
		getTasks(boardId: $boardId) {
			id
			boardId
			title
			description
			deadline
			status
		}
	}
`;