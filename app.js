const express = require('express');
const app = express();

app.set('view engine', 'ejs'); //nastaveni view enginu

app.get('/home', function (req,res){
    res.render('home',);
});




const port=8080;
app.listen(port, () => console.log(`Aplikace běží na portu ${port}`));