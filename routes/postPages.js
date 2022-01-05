var register = require('../controllers/register');
const express = require('express');
const router = express.Router();


//post routa na register -> postuje data funkce DataDoDB z register.js
router.post('/register', register.DataDoDB);

module.exports = router;
