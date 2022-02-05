const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const spojeni = require('./modules/databaseConection.js');//toto je tady jen abych si overil spojeni s db

const homePageRout = require('./controllers/homePage')
const registerRout = require('./controllers/register')
const loginRout = require('./controllers/login')




app.set('view engine', 'ejs'); //nastaveni view enginu

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//nastavení routy
app.use('/', homePageRout);
app.use('/register', registerRout);
app.use('/login', loginRout);


const port=3000; //jaky mam port
app.listen(port, () => console.log(`Aplikace běží na portu ${port}`));