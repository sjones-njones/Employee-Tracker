const mysql = require('mysql2');
// const init = require('../index');
require('console.table');
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
  db.query(`SELECT role.title AS Title, role.id as ID, department.name AS Department, role.salary AS Salary
  FROM role
  LEFT JOIN department
  ON role.department_id = department.id
  ORDER BY role.title`, function (err, results) {
    console.table(results);
  });
}

module.exports = renderAllRolesTable;





