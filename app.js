const express = require('express');
const app = express();
var bodyParser = require('body-parser');

//var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs'); //nastaveni view enginu




const port=8080; //jaky mam port
app.listen(port, () => console.log(`Aplikace běží na portu ${port}`));