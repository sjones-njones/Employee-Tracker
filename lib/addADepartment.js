const mysql = require('mysql2');
const inquirer = require('inquirer');
const renderDepartmentTable = require('./renderDepartmentTable');

function addADepartment() {
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

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'addDepartment',
        message: 'What is the name of the department?',
        validate: newDeptInput => {
          if (newDeptInput) {
            return true
          } else {
            console.log('Please enter a name for the new department')
            return false
          }
        }
      }])
    .then((dept) => {
      newDepartment = dept.addDepartment;
      console.log(`New Department Added: ${newDepartment}`);
      // Query database
      db.query(`INSERT INTO department SET ?`, { name: newDepartment }, function (err, results) {
        console.table(results);
      });
      renderDepartmentTable();
    });

}

module.exports = addADepartment

