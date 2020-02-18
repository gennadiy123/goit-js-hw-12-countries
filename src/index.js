import './styles.css';
import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';
import PNotifyButtons from '../node_modules/pnotify/dist/es/PNotifyButtons.js';
import fetchCountries from './fetchCountries';
import template from './templates.hbs';
import debounce from 'lodash.debounce';
import '../node_modules/pnotify/dist/PNotifyBrightTheme.css';

const input = document.querySelector('#input-id');
const finalTemplate = document.querySelector('#country-list');
input.addEventListener('input', debounce(onInput, 500));

function onInput(event) {
  fetchCountries(event.target.value, countryResult);
}

function countryResult (data) {
  if (data.length === 1) {
    clearResults();
    const mark = data.map(elem => template(elem)).join('')
    finalTemplate.insertAdjacentHTML('beforeend', mark);
  } else if (data.length > 1 && data.length <= 10) {
    clearResults();
    const mark = data.map(elem => `<li>${elem.name}</li>`).join('');
    finalTemplate.insertAdjacentHTML('beforeend', mark);
  } else {
    clearResults();
    PNotify.error({
      text: 'Error',
    });
  }
  // else (data.length > 10) {
  //   // PNotify.error([]);
    
  // }
  
}

function clearResults() {
  finalTemplate.innerHTML = '';
}

// function createTemplate(event) {
//   if (event.target.value === '') {
//     whereToAdd.innerHTML = '';
//     return;
//   }
//   // fetchCountries(event.target.value, countryResult);
// }