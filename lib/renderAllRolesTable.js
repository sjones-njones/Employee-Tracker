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
  db.query(`SELECT department.id, role.title, department.name AS department, role.salary
  FROM role
  LEFT JOIN department
  ON role.id = department.id
  ORDER BY department.id`, function (err, results) {
    console.log(results);
  });
}

module.exports = renderAllRolesTable;





