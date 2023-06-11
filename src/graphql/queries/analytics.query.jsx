import { gql } from "@apollo/client";

export const GET_ANALYTICS = gql`
	query getAnalytics($userId: String!) {
		getAnalytics(userId: $userId) {
			id
			userId
			completedEvents
			totalEvents
		}
	}
`;