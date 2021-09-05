const APIURL = 'https://economia.awesomeapi.com.br/json/all';

const currenciesAPI = () => (
  fetch(APIURL)
    .then((response) => (
      response.json()
    ))
);

export default currenciesAPI;
