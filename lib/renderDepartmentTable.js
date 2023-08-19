const mysql = require('mysql2');

function renderDepartmentTable() {
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
  db.query('SELECT * FROM department', function (err, results, fields) {
    console.table(results);
  });
}

module.exports = renderDepartmentTable;