'use strict';

const { getJSON } = require('../utils/getter');

exports.find = async(name) => {
  let response = await getJSON('https://pokeapi.co/api/v2/pokemon?limit=1000');
  let results = [];

  console.log('Search by name: ' + name);

  let fetching = !!response;

  // Get every page of the response
  while (fetching){

    // For every page, check pokemons that match with the name variable
    let findings = response.results.filter((r) => {
      return r.name.startsWith(name);
    });

    // For every match, get the name & image of the pokemon
    if (findings.length > 0){
      let pokemons = await Promise.all(findings.map(async(f) => {

        let pokemon = await getJSON(f.url);

        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.front_default,
        };
      }));
      results = results.concat(pokemons);
    }

    if (response.next){
      response = await getJSON(response.next);
    } else {
      fetching = false;
    }
  }
  return results;
};
