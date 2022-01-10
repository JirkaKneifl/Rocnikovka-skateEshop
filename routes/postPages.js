const register = require('../controllers/register');
const login = require('../controllers/login');

const express = require('express');
const router = express.Router();


//post routa na register -> postuje data funkce DataDoDB z register.js
router.post('/register', register.DataDoDB);

route.post('/login', login.DataZDB)

module.exports = router;
