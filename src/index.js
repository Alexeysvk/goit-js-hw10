import './css/styles.css';
// import fetchCountries from './fetchCountries';
import Notiflix from "notiflix";
import API from './fetchCountries';
// console.log(API);
var Debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.getElementById("search-box"),
    ul: document.querySelector('.country-list'),
    container: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', Debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();

    const countryName = e.target.value;
    
    API.fetchCountries(countryName)
    .then(renderCountryCard)
    .catch(catchError)
};

function renderCountryCard(countries) {
    console.log(countries);
    if (countries.length === 1) {
        const markup = countries.map((country) => {
            return `
        <div class="head-container">
        <img class="country-flag-margin" src="${country.flags.svg}" width="45" height="45" alt="">
        <h3 class="country-name">${country.name.official}</h3>
        </div>
        <ul>
           <li><p class="list-item">Capital: ${country.capital}</p></li>
           <li><p class="list-item">Population: ${country.population}</p></li>
           <li><p class="list-item">Languages: ${Object.values(country.languages)}</p></li>
        </ul>`;
        })
            .join('');
        refs.container.innerHTML = markup;
        refs.ul.innerHTML = '';
    } else if (countries.length >= 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } else {
        const markup = countries.map((country) => {
            return `
        <li class="country-list-item">
        <img class="country-flag-margin" src="${country.flags.svg}" width="24" height="24" alt="">
        <h3>${country.name.official}</h3>
        </li>`;
        })
            .join('');
        refs.ul.innerHTML = markup;
        refs.container.innerHTML = '';
    }
} 

function catchError(error) {
    console.log(error);
    Notiflix.Notify.failure("Oops, there is no country with that name");
    cardContainer.innerHTML = '';
    ulList.innerHTML = '';
}