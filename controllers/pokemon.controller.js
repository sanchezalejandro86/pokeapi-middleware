const { default: Axios } = require("axios");

const PokemonService = require("../services/pokemon.service");

exports.find = async (req, res) => {
    try {
        let pokemons = await PokemonService.find(req.query.name); 
        res.status(200).json(pokemons);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  };