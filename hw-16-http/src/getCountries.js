import _, { camelCase } from 'lodash';
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

const countriesList = document.querySelector('#countries-list');
const searchInput = document.querySelector('#search-input');
const BASE_URL = 'https://restcountries.com/v3.1/name/';
const FIELDS = '?fields=name,capital,flags,coatOfArms,population,region,languages';

function fetchCountries(query) {
    return fetch(`${BASE_URL}${query}${FIELDS}`);
}

function onInputAddCountires(e) {
    const query = e.target.value.toLowerCase().trim();

    if (!query) {
        countriesList.innerHTML = '';
        return;
    }

    fetchCountries(query)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.length > 10) {
                iziToast.error({
                    title: 'Error',
                    message: 'Too many matches found. Please enter a more specific name.',
                });
              countriesList.innerHTML = '';
                return;
            }
            if (data.length >= 2 && data.length <= 10) {
                const markup = data.map(country => {
                    return ` 
                    <li>
                        <div class="item-header">
                            <h2 class="country-title">${country.name.common}</h2>
                        </div>
                    </li>`;
                }).join('');
                
                countriesList.innerHTML = markup; 
                return;              
            }
            const markup = data
                .map(country => {
                    return `
                          <li>
                              <div class="item-wrapper">
                                  <div class="item-header">
                                      <img
                                          class="country-flag country-flag-small"
                                          src="${country.coatOfArms?.svg || country.flags?.svg}"
                                          alt="${country.flags?.alt || country.name.common}"
                                      />
                                      <h2 class="country-title">${country.name.common}</h2>
                                  </div>
                                  <div class="item-info list-view-info">
                                      <p class="item-info-row">
                                          <span>Capital:</span> 
                                          <span class="info-value">${country.capital}</span>
                                      </p>
                                      <p class="item-info-row">
                                          <span>Population:</span> 
                                          <span class="info-value">${country.population.toLocaleString('ru-RU')}</span>
                                      </p>
                                      <p class="item-info-row hidden-on-mobile">
                                          <span>Region:</span> 
                                          <span class="info-value">${country.region}</span>
                                      </p>
                                      <p class="item-info-row hidden-on-mobile">
                                          <span>Languages:</span> 
                                          <span class="info-value">${Object.values(country.languages)}</span>
                                      </p>
                                  </div>
                              </div>
                          </li>`;
                })
                .join('');

            countriesList.innerHTML = markup;
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
        });
}

searchInput.addEventListener('input', _.debounce(onInputAddCountires, 500));
