const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');

// nastaveni routy na register -> kdyz pouziju get metodu...
router.get('/', (req, res) => {
  res.render('register/index');
});

// zaheshovani hesla a poslani dat z register formu do DB
router.post('/', async (req, res) => {
  try {
    const {
      jmeno, prijmeni, telefon, email, heslo,
    } = req.body;
    // hash 10x a salt se k nemu prida automaticky
    const hashovanyHeslo = await bcrypt.hash(heslo, 10); 
    ModulRegister.DataDoDB(jmeno, prijmeni, telefon, email, hashovanyHeslo);
    res.redirect('register/index');
  } catch {
    res.redirect('register/registerOk');
  }
});

// routa na stranku potvrzeni registrace
router.get('/registerOk', (req, res) => {
  res.render('register/registerOk');
});

module.exports = router;
