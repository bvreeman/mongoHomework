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

router.post('/api/burgers', function(req, res) {
  burger.insertOne([
    'burger_name',
  ], [
    req.body.burger_name,
  ], function(result) {
    res.json({ id: result.insertID });
  });
});

router.put('/api/burgers/:id', function(req, res) {
  const body = {
    ...req.body,
  };
  console.log('LOOK BODY', body);
  const fields = Object.keys(body);
  console.log('LOOK FIELDS', fields);
  const value = [];
  for (const val in req.body) {
    value.push(req.body[val]);
  }
  const params = [...fields, ...value];
  console.log('LOOK PARAMS', params);
  burger.updateOne(req.params.id, params, function() {

    // res.redirect('/');
  });
});

module.exports = router;
