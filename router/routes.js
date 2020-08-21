const express = require("express");

const router = express.Router();

const pokemon = require("../controllers/pokemon.controller");

router.get("/pokemons", pokemon.find);

module.exports = router;