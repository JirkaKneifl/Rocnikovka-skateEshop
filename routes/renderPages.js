const express = require('express');
const router = express.Router();


//routa na homepage
router.get('/', function(req, res) {
    res.render('homePage')
})

router.get('/register', function(req, res) {
    res.render('register')
})

module.exports = router;