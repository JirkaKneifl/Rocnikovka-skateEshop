const express = require('express');
const app = express();

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




const port=8080;
app.listen(port, () => console.log(`Aplikace běží na portu ${port}`));