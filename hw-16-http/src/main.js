import "./getCountries.js";

import _, { camelCase } from 'lodash';
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';
import renderCountries from "./renderCountries.js";
import renderCountry from "./renderCountry.js";

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
                countriesList.innerHTML = renderCountries(data); 
                return;              
            }
            countriesList.innerHTML = renderCountry(data);
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
        });
}

searchInput.addEventListener('input', _.debounce(onInputAddCountires, 500));
