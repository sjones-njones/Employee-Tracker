const mysql = require('mysql2');
const inquirer = require('inquirer');
const renderDepartmentTable = require('./renderDepartmentTable');

function addAnEmployee() {
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


  db.query(`SELECT role.title, role.id FROM role`, function (err, results) {
    if (err) throw err;
    const roleChoices = results.map((role) => {
      return {
        name: role.title,
        value: role.id
      };
    });
    // console.log(roleChoices);
    db.query(`SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS name, employee.id FROM employee`,
      function (err, results) {
        if (err) throw err;
        const employeeChoices = results.map((employee) => {
          return {
            name: employee.name,
            value: employee.id
          };
        });
        // console.log(employeeChoices);
        prompts(employeeChoices, roleChoices);
      })
  })


  function prompts(employeeChoices, roleChoices) {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'What is the first name of the employee?',
          validate: firstInput => {
            if (firstInput) {
              return true
            } else {
              console.log('Please enter a first name for the new employee')
              return false
            }
          }
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'What is the last name of the employee?',
          validate: lastInput => {
            if (lastInput) {
              return true
            } else {
              console.log('Please enter a last name for the new employee')
              return false
            }
          }
        },
        {
          type: 'list',
          name: 'role',
          message: 'What is the role of the employee?',
          choices: roleChoices
        },
        {
          type: 'list',
          name: 'manager',
          message: 'Which manager does this employee report to?',
          choices: employeeChoices
        },
      ])
//       .then((res) => {
//       db.query(`INSERT INTO employee SET ?`, 
//       {
//         first_name: res.first_name,
//         last_name: res.last_name,
//         role: res.role.value,
//         manager_id: res.employee.value
//       }, 
//         function (err, results) 
//       {
//             if (err) {throw err};
// }
//  );       
  
//       console.log("New employee added!")
//     });

  };
}
module.exports = addAnEmployee

// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
