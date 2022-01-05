const express = require('express');
const router = express.Router();//


//routa na homepage
router.get('/', function(req, res) {
    res.render('homePage')
})

//routa na register
router.get('/register', function(req, res) {
    res.render('register')
})

//routa na login
router.get('/login', function(req, res) {
    res.render('login')
})

router.get('/registerOk', function(req, res) {
    res.render('registerOk')
})

module.exports = router;