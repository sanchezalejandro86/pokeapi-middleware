'use strict';

require('dotenv').config();

const express = require('express');
// const bodyParser = require("body-parser");

const router = require('./router/routes');

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

app.get('/', (req, res) => {
  res.json({
    funcionando: true,
    estado: 'Middleware funcionando correctamente',
  });
});

app.use('/', router);

let puerto = process.env.PORT || 3000;
app.listen(puerto, () => {
  console.log('🚀 Escuchando en el puerto ', puerto);
});
