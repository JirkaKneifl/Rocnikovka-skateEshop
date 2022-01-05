const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const renderPages = require('./routes/renderPages');
const postPages = require('./routes/postPages');
var spojeni = require('./databaseConection.js');//toto je tady jen abych si overil spojeni s db



app.set('view engine', 'ejs'); //nastaveni view enginu

app.use(express.json());
app.use(express.urlencoded({ extended: false }));




//routa na renderPges
app.use('/', renderPages);

//routa na postPages
app.use('/postPages', postPages);



const port=3000; //jaky mam port
app.listen(port, () => console.log(`Aplikace běží na portu ${port}`));