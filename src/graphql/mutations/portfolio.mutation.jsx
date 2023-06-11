import { gql } from "@apollo/client";

export const CREATE_PORTFOLIO = gql`
	mutation createPortfolio($data: PortfolioInput!) {
		createPortfolio(data: $data) {
			id
			sellerId
			about
			categories
		}
	}
`;

export const UPDATE_PORTFOLIO = gql`
	mutation updatePortfolio($data: PortfolioInput!) {
		updatePortfolio(data: $data) {
			id
			sellerId
			about
			categories
		}
	}
`;