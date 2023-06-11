import { gql } from "@apollo/client";

export const GET_ALL_PACKAGES = gql`
	query getAllPackages($userId: String!) {
		getAllPackages(userId: $userId) {
			id
			title
			price
			picture
			description
			sellerId
		}
	}
`;