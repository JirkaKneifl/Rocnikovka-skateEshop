const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const homePage = require('./routes/renderPages');



app.set('view engine', 'ejs'); //nastaveni view enginu




app.use('/', homePage);



const port=8080; //jaky mam port
app.listen(port, () => console.log(`Aplikace běží na portu ${port}`));