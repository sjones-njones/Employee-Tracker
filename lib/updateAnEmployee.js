const mysql = require('mysql2');
const inquirer = require('inquirer');

function updateAnEmployee() {
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
          type: 'list',
          name: 'employee',
          message: 'Select an employee to update.',
          choices: employeeChoices
        },
        {
          type: 'list',
          name: 'role',
          message: 'What is their new role?',
          choices: roleChoices
        },
      ])
      .then((res) => {
        db.query(`
    INSERT
     INTO employee (role_id) 
     VALUES (${res.role.value}) 
     WHERE employee.id = ${res.employee.value}`,
          function (err) {
            if (err) { throw err };
          }
        );

        console.log("Employee role updated!")
      });

  };
}
module.exports = updateAnEmployee

// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
