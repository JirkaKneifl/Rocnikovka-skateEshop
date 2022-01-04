const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const renderPages = require('./routes/renderPages');
var spojeni = require('./databaseConection.js');//toto je tady jen abych si overil spojeni s db



app.set('view engine', 'ejs'); //nastaveni view enginu



//routa na renderPges
app.use('/', renderPages);



const port=8080; //jaky mam port
app.listen(port, () => console.log(`Aplikace běží na portu ${port}`));