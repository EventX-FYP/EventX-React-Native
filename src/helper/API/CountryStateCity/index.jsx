// Refer to this link for more details: https://countrystatecity.in/docs/
import { fetchCountry, fetchStates, fetchCities } from "./fetchData"
import { GET_COUNTRY_API, GET_STATES_API, GET_COUNTRY_DETAILS_API, GET_STATES_BY_COUNTRY_API, GET_STATE_DETAIL_API, GET_CITIES_BY_STATE_API, GET_CITIES_BY_COUNTRY_API } from "./routes"

export const CountryStateCityAPI = {
  GET_COUNTRY_API,
  GET_STATES_API,
  GET_COUNTRY_DETAILS_API,
  GET_STATES_BY_COUNTRY_API,
  GET_STATE_DETAIL_API,
  GET_CITIES_BY_STATE_API,
  GET_CITIES_BY_COUNTRY_API,
  fetchCountry,
  fetchStates, 
  fetchCities
}