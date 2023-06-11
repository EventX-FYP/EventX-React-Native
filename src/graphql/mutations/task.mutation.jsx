import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
	mutation createTask($data: TaskInput!, $userId: String) {
		createTask(data: $data, userId: $userId) {
			id
			boardId
			title
			description
			deadline
			status
		}
	}
`;

export const UPDATE_TASK_STATUS = gql`
	mutation updateTaskStatus($status: String!, $id: String) {
		updateTaskStatus(description: $description, id: $id) {
			id
			boardId
			title
			description
			deadline
			status
		}
	}
`;

export const UPDATE_TASK_DESCRIPTION = gql`
	mutation updateTaskDescription($description: String!, $id: String) {
		updateTaskDescription(description: $description, id: $id) {
			id
			boardId
			title
			description
			deadline
			status
		}
	}
`