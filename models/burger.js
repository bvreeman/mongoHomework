const orm = require('../config/orm.js');

const burger = {
  selectAll: function(cb) {
    orm.selectAll(function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  insertOne: function(burgerName, cb) {
    orm.insertOne(burgerName, function(res) {
      cb(res);
    });
  },
  updateOne: function(burgerID, cb) {
    orm.update(burgerID, function(res) {
      cb(res);
    });
  },
};

  // Export the database functions for the controller (catsController.js).
module.exports = burger;
