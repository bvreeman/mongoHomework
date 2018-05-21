const express = require('express');
const burger = require('../models/burger.js');

const router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get('/', function(req, res) {
  burger.selectAll(function(data) {
    const hbsObject = {
      burgers: data,
    };
    res.render('index', hbsObject);
  });
});

router.post('/burger/create', function(req, res) {
  if (req.body.burger_name !== '') {
    burger.insertOne(req.body.burger_name, function() {
      res.redirect('/');
    });
  }
});

router.post('/burger/:id', function(req, res) {
  burger.updateOne(req.params.id, function() {
    res.redirect('/');
  });
});

module.exports = router;
