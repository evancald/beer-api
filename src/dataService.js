const axios = require('axios');

function getBeerData() {
  return axios.get('https://api.punkapi.com/v2/beers')
    .then((response) => {
      console.log(response.data);
      const beer = response.data;
      const newBeer = {
        name: beer.name,
        tagline: beer.tagline,
        description: beer.description,
        abv: beer.abv
      };
      return newBeer;
    })
    .catch(error => {
      console.log(error);
    });
}

export function getBeerData() {
}