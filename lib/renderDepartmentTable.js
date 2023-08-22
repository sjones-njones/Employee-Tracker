const mysql = require('mysql2');

function renderDepartmentTable(init) {
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
    db.query('SELECT department.id AS ID, department.name AS Department FROM department ORDER BY department.name', function (err, results, fields) {
      console.table(results);
    });
    // init();
}

module.exports = renderDepartmentTable;

