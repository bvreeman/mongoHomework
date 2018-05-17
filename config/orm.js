// Import MySQL connection.
const connection = require('../config/connection.js');

// Object for all our SQL statement functions.
const orm = {
  selectAll: function(tableInput, cb) {
    const queryString = 'SELECT * FROM ??';
    connection.query(queryString, [tableInput], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertOne: function(tableInput, columnName, burgerName, cb) {
    const queryString = 'INSERT INTO ?? (??) VALUES (?)';
    connection.query(queryString, [tableInput, columnName, burgerName], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  updateOne: function(tableInput, updateColumnName, updateRowValue, searchColumnName, searchRowValue, cb) {
    const queryString = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
    connection.query(queryString, [tableInput, updateColumnName, updateRowValue, searchColumnName, searchRowValue], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
};

// Export the orm object for the model (cat.js).
module.exports = orm;
