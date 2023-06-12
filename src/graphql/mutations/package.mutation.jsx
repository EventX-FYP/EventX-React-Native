import { gql } from "@apollo/client";

export const CREATE_PACKAGE = gql`
	mutation createPackage($data: String!) {
		createPackage(data: $data) {
			id
			# createdAt
			# updatedAt
			title
			description
			price
			picture
			sellerId
			categories
		}
	}
`;

export const UPDATE_PACKAGE = gql`
	mutation updatePackage($data: PackageInput!) {
		updatePackage(data: $data) {
			id
			createdAt
			updatedAt
			title
			description
			price
			picture
			sellerId
			categories
		}
	}
`;