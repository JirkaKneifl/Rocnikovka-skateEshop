const register = require('../controllers/register');
const express = require('express');
const router = express.Router();



router.post('/register', register.DataDoDB);

module.exports = router;
