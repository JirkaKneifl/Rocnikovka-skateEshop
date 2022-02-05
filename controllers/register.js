const ModulRegister = require("../modules/ModulRegister");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");


//nastaveni routy na register -> kdyz pouziju get metodu...
router.get("/", function (req, res) {
  res.render("register/index");
});

//zaheshovani hesla a poslani dat z register formu do DB
router.post("/", async function (req, res) {
  try {
    const {jmeno , prijmeni , telefon , email , heslo} = req.body;
    const hashovanyHeslo = await bcrypt.hash(heslo, 10); //hash 10x a salt se k nemu prida automaticky
    ModulRegister.DataDoDB(jmeno,prijmeni,telefon,email,hashovanyHeslo);
    res.redirect("register");
  } 
  catch {
    res.redirect("registerOk");
  }
});

//routa na stranku potvrzeni registrace
router.get("/registerOk", function(req, res){
  res.render("register/registerOk");
})

module.exports = router;

