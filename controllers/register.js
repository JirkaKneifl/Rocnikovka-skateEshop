const ModulRegister = require("../modules/ModulRegister");
const express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");


//nastaveni routy na register -> kdyz pouziju get metodu...
router.get("/", function (req, res) {
  res.render("register");
});

//zaheshovani hesla a poslani dat z register formu do DB
router.post("/", async function (req, res) {
  console.log(req.body)
  try {
    const {jmeno , prijmeni , telefon , email , heslo} = req.body;
    const hashovanyHeslo = await bcrypt.hash(heslo, 10); //hash 10x a salt se k nemu prida automaticky
    ModulRegister.DataDoDB(jmeno,prijmeni,telefon,email,hashovanyHeslo);
    res.redirect("registerOk");
  } 
  catch {
    res.redirect("register");
  }
});

module.exports = router;

/*
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
*/
