const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');
const renderAllRolesTable = require('./renderAllRolesTable');

function addARole() {
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

  db.query(`SELECT * FROM department`, function (err, results) {
    if (err) throw err;
    const deptChoices = results.map((department) => {
      return {
        name: department.name,
        value: department.id
      };
    });
    console.log(deptChoices);
    inquirer.prompt([
      {
        type: 'input',
        name: 'addARole',
        message: 'What is the name of the role?',
        validate: newRoleInput => {
          if (newRoleInput) {
            return true
          } else {
            console.log('Please enter a name for the new role')
            return false
          }
        }
      },
      {
        type: 'input',
        name: 'addSalary',
        message: 'What is the salary for this role?',
        validate: newRoleSalaryInput => {
          if (newRoleSalaryInput) {
            return true
          } else {
            console.log('Please enter a valid salary for the new role')
            return false
          }
        }
      },
      {
        type: 'list',
        name: 'addDepartment',
        message: 'Which department is this role in?',
        choices: deptChoices

      },
    ])
  })
//     .then((role) => {
//       db.query(`INSERT INTO role SET ?`, 
//       {
//         title: role.newRole,
//         salary: role.salary,
//         department_id: department.valueres
//       }, 
//         function (err, results) 
//       {
//             if (err) {throw err};
// }
//  );       
  
//       console.log("New role added!")
//     });
}

module.exports = addARole
