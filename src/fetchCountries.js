const searchParams = 'name,capital,population,flags,languages';
const baseUrl = 'https://restcountries.com/v3.1/name';
function fetchCountries(name) { 
    return fetch(`${baseUrl}/${name}?fields=${searchParams}`)
    .then(response => {
        if(!response.ok){
            throw Error(response.statusText);
        } 
        return response.json() })  
};
export default { fetchCountries };