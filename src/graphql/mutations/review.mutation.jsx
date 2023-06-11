import { gql } from "@apollo/client";

export const CREATE_REVIEW = gql`
	mutation createReview($data: String!) {
		createReview(data: $data) {
			id
			createdAt
			sellerId
			customerId
			review
			rating
		}
	}
`;