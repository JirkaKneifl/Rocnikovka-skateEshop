const spojeni = require('../databaseConection');

const express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
var saltRounds = 10; //kolikrat se zahashuje heslo -> 10x



function DataDoDB (req, res ){
      const {jmeno, prijmeni, telefon, email, heslo} = req.body //konstatnta ve které se uloží data z formu

      bcrypt.hash(heslo, saltRounds).then(function(hash) {//async funkce na zahashovani hesla
        
        //vložíme hodnoty z formuláře do databaze
        spojeni.query(`INSERT INTO zakaznici(jmeno, prijmeni, telefon, email, heslo) VALUES ('${jmeno}','${prijmeni}', '${telefon}','${email}','${hash}')`, 
        function (err){
              if(err) {
                console.log(err);
              }else {
                console.log("Data se importovali dobře")
                return res.redirect('/registerOk'); //redirektuju na registerOk.js  
             }
        })
      })
}

module.exports.DataDoDB = DataDoDB;   

