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
    let queryString = INSERT INTO ?? (??) VALUES (?)";

    queryString += ' (';
    queryString += cols.toString();
    queryString += ') ';
    queryString += 'VALUES (';
    queryString += printQuestionMarks(vals.length);
    queryString += ') ';

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {
    let queryString = `UPDATE ${table}`;

    queryString += ' SET ';
    queryString += objToSql(objColVals);
    queryString += ' WHERE ';
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  delete: function(table, condition, cb) {
    let queryString = `DELETE FROM ${table}`;
    queryString += ' WHERE ';
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
};

// Export the orm object for the model (cat.js).
module.exports = orm;
