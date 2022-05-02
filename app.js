const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
require('dotenv').config()

const app = express();

const spojeni = require('./modules/databaseConection.js');//toto je tady jen abych si overil spojeni s db
const homePageRout = require('./controllers/homePage')
const registerRout = require('./controllers/register')
const loginRout = require('./controllers/login')
const productPageRout = require('./controllers/categoryProducsController')
const cartPageRout = require('./controllers/cartController')


//console.log(process.env)

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge:  10 * 1000, //cas po ktery funguje je 
    }
}));

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
app.use('/kosik', cartPageRout);
app.use('/kosik/objednavka-odeslana', cartPageRout );

app.use('/register', registerRout);
app.use('/login', loginRout);



const port=process.env.PORT; //jaky mam port
app.listen(port, () => console.log(`Aplikace běží na portu ${port}`));