var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'nodepop',
    description: 'Pagina de inicio del proyecto nodepop',
    author: 'The Handy Owl',
    mainDomain: 'https://thehandyowl.com/',
    nodepopDomain: 'https://nodepop.thehandyowl.com/'
  });
});

module.exports = router;
