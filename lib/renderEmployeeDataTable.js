const mysql = require('mysql2');

function renderEmployeeDataTable() {
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
  db.query(`SELECT 
  employee.id as ID, 
  employee.first_name AS First_Name, 
  employee.last_name AS Last_Name, 
  role.title AS Title,
  department.name AS Department,
  role.salary AS Salary

  FROM employee 
  JOIN role 
  ON employee.role_id = role.id
  JOIN department
  ON role.department_id = department.id`, function (err, results) {
    console.table(results);
  });
}

module.exports = renderEmployeeDataTable;

// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

// department.name AS Department,

// `SELECT employee.id AS ID, employee.first_name AS First-Name, employee.last_name AS Last-Name, role.title, role.salery AS Salary,  
  
//   FROM employee
//   JOIN role
//   ON employee.role_id = role.id
//   // ORDER BY department.id`