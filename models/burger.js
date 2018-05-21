const orm = require('../config/orm.js');

const burger = {
  selectAll: function(cb) {
    orm.selectAll('burgers', function(res) {
      cb(res);
    });
  },
  insertOne: function(burgerName, cb) {
    orm.insertOne(burgerName, function(res) {
      cb(res);
    });
  },
  updateOne: function(tableInput, burgerID, cb) {
    orm.updateOne(burgerID, function(res) {
      cb(res);
    });
  },
};

  // Export the database functions for the controller (burgers_controller.js).
module.exports = burger;
