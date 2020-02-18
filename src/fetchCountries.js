export default function(search, callback) {
    const baseUrl = 'https://restcountries.eu/rest/v2/name/';
    return fetch(baseUrl + search).then(data => data.json()).then(data => callback(data));
}

