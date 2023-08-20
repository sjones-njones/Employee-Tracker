const mysql = require('mysql2');

function testing() {
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
  db.query(`SELECT employee.first_name AS First_Name, 
  employee.last_name AS Last_Name, 
    
  FROM employee 
  ON employee.manager_id = employee.id
  `, function (err, results) {
    console.table(results);
  });
}

module.exports = testing;
