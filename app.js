const express = require('express');
var ZakaznickyRouter = require('./routy/register');
const app = express();

app.use('./routy/register.js', ZakaznickyRouter);

const port=8080;
app.listen(port, () => console.log(`Aplikace běží na portu ${port}`));