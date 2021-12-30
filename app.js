const express = require('express');
const app = express();
var bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs'); //nastaveni view enginu

//routa na homepage
app.get('/home', function (req,res){
    res.render('home');
    console.log("jsi na homepage")
});

//routa na registerpage
app.get('/register', function (req,res){
    res.render('register');
    console.log("jsi na registerpage")
});


app.post('/register', urlencodedParser, function (req,res){
    console.log(req.body);
});





const port=8080;
app.listen(port, () => console.log(`Aplikace běží na portu ${port}`));