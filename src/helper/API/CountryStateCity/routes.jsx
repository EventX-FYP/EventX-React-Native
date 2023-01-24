export const GET_COUNTRY_API = "https://api.countrystatecity.in/v1/countries"
export const GET_STATES_API = "https://api.countrystatecity.in/v1/states"
export const GET_COUNTRY_DETAILS_API = (countryCode) => `https://api.countrystatecity.in/v1/countries/${countryCode}`
export const GET_STATES_BY_COUNTRY_API = (countryCode) => `https://api.countrystatecity.in/v1/countries/${countryCode}/states`
export const GET_STATE_DETAIL_API = (countryCode, stateCode) => `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}`
export const GET_CITIES_BY_STATE_API = (countryCode, stateCode) => `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`
export const GET_CITIES_BY_COUNTRY_API = (countryCode) => `https://api.countrystatecity.in/v1/countries/${countryCode}/cities`