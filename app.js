const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
require('dotenv').config()

const app = express();

const spojeni = require('./databaseConection');//toto je tady jen abych si overil spojeni s db
const homePageRout = require('./src/homePage/controllers/homePage')
const registerRout = require('./src/admin/controllers/register')
const loginRout = require('./src/admin/controllers/login')
const productPageRout = require('./src/katalog/controllers/categoryProducsController')
const cartPageRout = require('./src/cart/controllers/cartController')
const orderPageRout = require('./src/order/controllers/orderController')
const kontaktPageRout = require('./src/kontakt/controllers/kontaktController')


//console.log(process.env)

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge:  5 * 60 * 1000, //cas po ktery funguje je 
    }
}));

//nastaveni view enginu
app.use(expressLayouts);
app.set('views', './src/layouts/views');
app.set('layout', '../hlavni')
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
app.use('/objednavka-odeslana', orderPageRout);
app.use('/kontakt', kontaktPageRout)

app.use('/register', registerRout);
app.use('/login', loginRout);



const port=process.env.PORT; //jaky mam port
app.listen(port, () => console.log(`Aplikace běží na portu ${port}`));