import { gql } from "@apollo/client";

export const GET_ALL_REVIEWS = gql`
	query getAllReviews {
		getAllReviews(userId: "648547b806217f7765de28f3") {
			id
			createdAt
			sellerId
			customerId
			review
			rating
		}
	}
`;