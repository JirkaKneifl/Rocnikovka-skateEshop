const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const renderPages = require('./routes/renderPages');
const postPages = require('./routes/postPages');
var spojeni = require('./databaseConection.js');//toto je tady jen abych si overil spojeni s db



app.set('view engine', 'ejs'); //nastaveni view enginu

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//routa na renderPges
app.use('/', renderPages);

app.use('/register', postPages);



const port=8080; //jaky mam port
app.listen(port, () => console.log(`Aplikace běží na portu ${port}`));