const mysql = require('mysql2');

function renderAllRolesTable() {
  const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'rootr00t!',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );
  
  // Query database
  db.query('SELECT * FROM role', function (err, results) {
    console.log(results);
  });
}

module.exports = renderAllRolesTable;