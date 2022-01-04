var dataDoDB = require('../controllers/register');
const express = require('express');
const router = express.Router();



router.post('/register', dataDoDB);

module.exports = router;
