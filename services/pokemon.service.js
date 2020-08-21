'use strict';

const { getJSON } = require('../utils/getter');

exports.find = async(name) => {
  let response = await getJSON('https://pokeapi.co/api/v2/pokemon?limit=1000');
  let results = [];

  console.log('Search by name: ' + name);

  let fetching = !!response;

  // Traer cada pagina del response
  while (fetching){

    // Por cada pagina chequear los que matchean con el nombre
    let findings = response.results.filter((r) => {
      return r.name.startsWith(name);
    });

    // Por cada match, traer el name e image del pokemon
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
