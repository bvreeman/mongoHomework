// Import MySQL connection.
const connection = require('../config/connection.js');

function printQuestionMarks(num) {
  const arr = [];

  for (let i = 0; i < num; i++) {
    arr.push('?');
  }

  return arr.toString();
}

// Object for all our SQL statement functions.
const orm = {
  selectAll: function(tableInput, cb) {
    connection.query(`SELECT * FROM ${tableInput};`, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
      // console.log(`selectAll ${result}`);
    });
  },
  insertOne: function(table, cols, vals, cb) {
    let queryString = `INSERT INTO ${table}`;

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
      // console.log(`insertOne ${result}`);
    });
  },
  updateOne: function(burgerID, cb) {
    connection.query('UPDATE burgers SET devoured WHERE ?', [{ devoured: true }, { id: burgerID }], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
      // console.log(`updateOne ${result}`);
    });
  },
};


module.exports = orm;
