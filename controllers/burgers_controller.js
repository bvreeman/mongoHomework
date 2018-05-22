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
    'burger_name', 'devoured',
  ], [
    req.body.burger_name, req.body.devoured,
  ], function(result) {
    res.json({ id: result.insertID });
  });
});

router.put('/api/burgers/:id', function(req, res) {
  const condition = `id = ${req.params.id}`;

  burger.updateOne({
    id: req.param.id,
    // devoured: req.body.devoured,
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
  });
  console.log('\n<-------------------------->\n');
  console.log('BURGER', req.param.id);
  console.log('\n<-------------------------->\n');
});

//   const body = {
//     ...req.body,
//   };
//   console.log('LOOK BODY', body);
//   const fields = Object.keys(body);
//   console.log('LOOK FIELDS', fields);
//   const value = [];
//   for (const val in req.body) {
//     value.push(req.body[val]);
//   }
//   const params = [...fields, ...value];
//   console.log('LOOK PARAMS', params);
//   burger.updateOne(req.params.id, params, function() {

//     // res.redirect('/');
//   });
// });

module.exports = router;
