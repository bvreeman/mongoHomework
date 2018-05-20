// Import MySQL connection.
const connection = require('../config/connection.js');

// Object for all our SQL statement functions.
const orm = {
  selectAll: function(tableInput, cb) {
    connection.query(`SELECT * FROM ${tableInput};`, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
      console.log(result);
    });
  },
  insertOne: function(tableInput, burgerName, cb) {
    connection.query(`INSERT INTO ${tableInput} SET ?`, {
      burger_name: burgerName,
      devoured: false,
    }, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  updateOne: function(tableInput, burgerID, cb) {
    connection.query(`UPDATE ${tableInput} SET ? WHERE ?`, [{ devoured: true }, { id: burgerID }], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    } );
  },
};


module.exports = orm;
