// Import MySQL connection.
const connection = require('../config/connection.js');

// Object for all our SQL statement functions.
const orm = {
  selectAll: function(cb) {
    connection.query('SELECT * FROM burgers', function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertOne: function(burgerName, cb) {
    connection.query('INSERT INTO burgers SET ?', {
      burger_name: burgerName,
      devoured: false,
    }, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  updateOne: function(burgerID, cb) {
    connection.query('UPDATE burgers SET ? WHERE ?', [{ devoured: true }, { id: burgerID }], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
};

module.exports = orm;
