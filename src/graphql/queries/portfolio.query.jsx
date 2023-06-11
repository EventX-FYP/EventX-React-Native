import { gql } from "@apollo/client";

export const GET_PORTFOLIO = gql`
	query getPortfolio($userId: String!) {
		getPortfolio(userId: $userId) {
			id
			sellerId
			categories
			about
		}
	}
`;