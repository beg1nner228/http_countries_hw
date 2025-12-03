const BASE_URL = 'https://restcountries.com/v3.1/name/';
const FIELDS = '?fields=name,capital,flags,coatOfArms,population,region,languages';

export default function fetchCountries(query) {
    return fetch(`${BASE_URL}${query}${FIELDS}`);
}
