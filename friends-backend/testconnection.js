// testConnection.js
const connection = require('./ dbConnection');

connection.query('SELECT 1 + 1 AS solution', (err, results, fields) => {
    if (err) throw err;
    console.log('The solution is:', results[0].solution);
    connection.end();
});
