require("dotenv").config();

const express = require("express");
//const bodyParser = require("body-parser");

const router = require("./router/routes");

const app = express();

app.get("/", (req, res) => {
    res.json({
      funcionando: true,
      estado: "Middleware funcionando correctamente",
    });
});
  
app.use("/", router);

let puerto = process.env.PORT || 3000;
app.listen(puerto, () => {
    console.log("🚀 Escuchando en el puerto ", puerto);
});