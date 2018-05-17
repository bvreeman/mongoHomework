const orm = require('../config/orm.js');

const burger = {
  selectAll: function(cb) {
    orm.selectAll('burgers', function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  insertOne: function(burgerName, cb) {
    orm.insertOne('burgers', 'burger_name', burgerName, function(res) {
      cb(res);
    });
  },
  updateOne: function(burgerID, cb) {
    orm.update('burgers', 'devoured', 1, 'id', burgerID, function(res) {
      cb(res);
    });
  },
};

  // Export the database functions for the controller (catsController.js).
module.exports = burger;
