import { GET_COUNTRY_API, GET_STATES_BY_COUNTRY_API, GET_CITIES_BY_COUNTRY_API, GET_CITIES_BY_STATE_API } from './routes'
export const fetchCountry = async (setCountries, API_KEY) => {
  const headers = new Headers();
  headers.append('X-CSCAPI-KEY', API_KEY);
  
  const response = await fetch(GET_COUNTRY_API, {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  })
    .then(res => res.json())
    .catch(err => console.log(err))
  
  setCountries(response.map(country => { return { name: country.name, code: country.iso2 }}))      
}

export const fetchStates = async (setStates, countryCode, API_KEY) => {
  const headers = new Headers();
  headers.append('X-CSCAPI-KEY', API_KEY);
  
  const response = await fetch(GET_STATES_BY_COUNTRY_API(countryCode), {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  })
    .then(res => res.json())
    .catch(err => console.log(err))
  
  setStates(response.map(state => { return { name: state.name, code: state.iso2 }}))
}

export const fetchCities = async (setCities, countryCode, stateCode, API_KEY) => {
  const headers = new Headers();
  headers.append('X-CSCAPI-KEY', API_KEY);

  let response;
  if (stateCode === '') {
    response = await fetch(GET_CITIES_BY_COUNTRY_API(countryCode), {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(err => console.log(err))
  }
  else {
    response = await fetch(GET_CITIES_BY_STATE_API(countryCode, stateCode), {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
    })
    .then(res => res.json())
    .catch(err => console.log(err))
  }
    
  setCities(response.map(city => { return { name: city.name }}))
}

