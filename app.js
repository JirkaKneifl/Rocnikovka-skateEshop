const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();

const spojeni = require('./modules/databaseConection.js');//toto je tady jen abych si overil spojeni s db
const homePageRout = require('./controllers/homePage')
const registerRout = require('./controllers/register')
const loginRout = require('./controllers/login')

const test = require('./modules/ModelMainCategori');//test

console.log(test);//test
console.log(test.arguments);//test
console.log(test.apply);//test

//nastaveni view enginu
app.use(expressLayouts);
app.set('layout', './layouts/hlavni')
app.set('view engine', 'ejs'); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//nastavení routy
app.use('/', homePageRout);
app.use('/register', registerRout);
app.use('/login', loginRout);


const port=3000; //jaky mam port
app.listen(port, () => console.log(`Aplikace běží na portu ${port}`));