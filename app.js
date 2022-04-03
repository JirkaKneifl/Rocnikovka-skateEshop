const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config()

const app = express();

const spojeni = require('./modules/databaseConection.js');//toto je tady jen abych si overil spojeni s db
const homePageRout = require('./controllers/homePage')
const registerRout = require('./controllers/register')
const loginRout = require('./controllers/login')
const productPageRout = require('./controllers/categoryProducsController')


//console.log(process.env)


//nastaveni view enginu
app.use(expressLayouts);
app.set('layout', './layouts/hlavni')
app.set('view engine', 'ejs'); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//nastaveni static souborů
app.use('/static', express.static('static'));

//nastavení routy
app.use('/', homePageRout);
app.use('/kategorie', productPageRout);
app.use('/kategorie/produkty', productPageRout);

app.use('/register', registerRout);
app.use('/login', loginRout);



const port=3000; //jaky mam port
app.listen(port, () => console.log(`Aplikace běží na portu ${port}`));