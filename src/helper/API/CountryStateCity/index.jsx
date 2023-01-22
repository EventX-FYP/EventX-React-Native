// Refer to this link for more details: https://countrystatecity.in/docs/
import { fetchCountry, fetchStates, fetchCities } from "./fetchData"

const GET_COUNTRY_API = "https://api.countrystatecity.in/v1/countries"
const GET_STATES_API = "https://api.countrystatecity.in/v1/states"
const GET_COUNTRY_DETAILS_API = (countryCode) => `https://api.countrystatecity.in/v1/countries/${countryCode}`
const GET_STATES_BY_COUNTRY_API = (countryCode) => `https://api.countrystatecity.in/v1/countries/${countryCode}/states`
const GET_STATE_DETAIL_API = (countryCode, stateCode) => `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}`
const GET_CITIES_BY_STATE_API = (countryCode, stateCode) => `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`
const GET_CITIES_BY_COUNTRY_API = (countryCode) => `https://api.countrystatecity.in/v1/countries/${countryCode}/cities`

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