const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
const chalk = require("chalk");

// creates connection to mysql
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

// list of options
const userOptions = [
  {
    type: 'list',
    name: 'options',
    message: 'What would you like to do?',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'delete a department', 'delete a role', 'delete an employee', 'view employees by department']
  }
];

// runs when the page opens
const init = () => {
  inquirer
    .prompt(userOptions)
    .then((opt) => {
      const userChoice = opt.options;
      // calls different fxns depending on user choice
      console.log(userChoice);
      if (userChoice === 'view all departments') {
        renderDepartmentTable();
      }
      else if (userChoice === 'view all roles') {
        renderAllRolesTable();
      }
      else if (userChoice === 'view all employees') {
        renderEmployeeDataTable();
      }
      else if (userChoice === 'add a department') {
        addADepartment();
      }
      else if (userChoice === 'add a role') {
        addARole();
      }
      else if (userChoice === 'add an employee') {
        addAnEmployee();
      }
      else if (userChoice === 'delete a department') {
        deleteADepartment();
      }
      else if (userChoice === 'delete a role') {
        deleteARole();
      }
      else if (userChoice === 'delete an employee') {
        deleteAnEmployee();
      }
      else if (userChoice === 'view employees by department') {
        viewEmployeesByDepartment();
      }
      else {

        updateAnEmployee();
      }
    });
}

//show deparment table 
const renderDepartmentTable = () => {
  // Query database
  db.query('SELECT department.id AS ID, department.name AS Department FROM department ORDER BY department.name', function (err, results, fields) {
    console.log(``);
    console.log(chalk.cyan.bold(`==============================================================================================`));
    console.log(chalk.cyan.bold(`==============================================================================================`));
    console.log(``);
    console.table(results);
    console.log(``);
    console.log(chalk.cyan.bold(`==============================================================================================`));
    console.log(chalk.cyan.bold(`==============================================================================================`));
    console.log(``);
    //  recalls init fxn
    init()
  })
}

// show all rolls table
function renderAllRolesTable() {
  // Query database
  db.query(`SELECT role.title AS Title, role.id as ID, department.name AS Department, role.salary AS Salary
  FROM role
  LEFT JOIN department
  ON role.department_id = department.id
  ORDER BY role.title`, function (err, results) {
    console.log(``);
    console.log(chalk.cyan.bold(`==============================================================================================`));
    console.log(chalk.cyan.bold(`==============================================================================================`));
    console.log(``);
    console.table(results);
    console.log(``);
    console.log(chalk.cyan.bold(`==============================================================================================`));
    console.log(chalk.cyan.bold(`==============================================================================================`));
    console.log(``);
    init()
  });
}

// show all employee table
function renderEmployeeDataTable() {
  // Query database
  db.query(`SELECT 
  employee.id as ID, 
  CONCAT(employee.first_name, ' ', employee.last_name) AS Name,
  role.title AS Title,
  department.name AS Department,
  role.salary AS Salary,
  CONCAT(manager.first_name, ' ', manager.last_name) AS Manager

  FROM employee 
  INNER JOIN role 
  ON employee.role_id = role.id
  INNER JOIN department
  ON role.department_id = department.id
  LEFT JOIN employee manager
  ON employee.manager_id = manager.id 
  `, function (err, results) {
    console.log(``);
    console.log(chalk.cyan.bold(`==============================================================================================`));
    console.log(chalk.cyan.bold(`==============================================================================================`));
    console.log(``);
    console.table(results);
    console.log(``);
    console.log(chalk.cyan.bold(`==============================================================================================`));
    console.log(chalk.cyan.bold(`==============================================================================================`));
    console.log(``);
    init()
  });
}

// allows user to add a dept
function addADepartment() {
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
      console.log(``);
      console.log(chalk.cyan.bold(`==============================================================================================`));
      console.log(``);
      console.log(`New Department Added: ${newDepartment}`);
      console.log(``);
      console.log(chalk.cyan.bold(`==============================================================================================`));
      console.log(``);
      // Query database
      db.query(`INSERT INTO department SET ?`, { name: newDepartment }, function (err, results) {
        console.table('A new department has been added.');
        init();
      });
    });

}

// allows user to add a role
function addARole() {

  db.query(`SELECT * FROM department`, function (err, results) {
    if (err) throw err;
    const deptChoices = results.map((department) => {
      return {
        name: department.name,
        value: department.id
      };
    });
    // prompts user 
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
      // promise returned and passed into .then
      .then((role) => {
        db.query(`INSERT INTO role SET ?`,
          {
            title: role.addARole,
            salary: role.addSalary,
            department_id: role.addDepartment
          });
        console.log(``);
        console.log(chalk.cyan.bold(`==============================================================================================`));
        console.log(``);
        console.log("New role added!");
        console.log(``);
        console.log(chalk.cyan.bold(`==============================================================================================`));
        console.log(``);
        init();
      });
  })
}

// allows user to add an employee
function addAnEmployee() {
  db.query(`SELECT role.title, role.id FROM role`, function (err, results) {
    if (err) throw err;
    const roleChoices = results.map((role) => {
      return {
        name: role.title,
        value: role.id
      };
    });
    db.query(`SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS name, employee.id FROM employee`,
      function (err, results) {
        if (err) throw err;
        const employeeChoices = results.map((employee) => {
          return {
            name: employee.name,
            value: employee.id
          };
        });
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
      .then((res) => {
        console.log(res)
        db.query(`INSERT INTO employee SET ?`,
          {
            first_name: res.first_name,
            last_name: res.last_name,
            role_id: res.role,
            manager_id: res.manager
          },
          function (err) {
            if (err) throw err;
          }
        )
        console.log(``);
        console.log(chalk.cyan.bold(`==============================================================================================`));
        console.log(``);
        console.log("New employee added!");
        console.log(``);
        console.log(chalk.cyan.bold(`==============================================================================================`));
        console.log(``);
        init();
      });
  };
}

//allows user to update an employee role 
function updateAnEmployee() {
  db.query(`SELECT role.title, role.id FROM role`, function (err, results) {
    if (err) throw err;
    const roleChoices = results.map((role) => {
      return {
        name: role.title,
        value: role.id
      };
    });
    db.query(`SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS name, employee.id FROM employee`,
      function (err, results) {
        if (err) throw err;
        const employeeChoices = results.map((employee) => {
          return {
            name: employee.name,
            value: employee.id
          };
        });
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
        db.query(`UPDATE employee SET role_id = ${res.role} WHERE id = ${res.employee}`,
          function (err) {
            if (err) { throw err };
          }
        );
        console.log(``);
        console.log(chalk.cyan.bold(`==============================================================================================`));
        console.log(``);
        console.log("Employee role updated!");
        console.log(``);
        console.log(chalk.cyan.bold(`==============================================================================================`));
        console.log(``);
        init();
      });
  };
}
function deleteADepartment() {
  db.query(`SELECT * FROM department`, function (err, results) {
    if (err) throw err;
    const deptChoices = results.map((department) => {
      return {
        name: department.name,
        value: department.id
      };
    });
    inquirer.prompt([
      {
        type: 'list',
        name: 'deleteDepartment',
        message: 'Which department would you like to delete?',
        choices: deptChoices

      },
    ])
      .then((dept) => {
        lostDepartment = dept.deleteDepartment;
        console.log(``);
        console.log(chalk.cyan.bold(`==============================================================================================`));
        console.log(``);
        console.log(`Department Deleted`);
        console.log(``);
        console.log(chalk.cyan.bold(`==============================================================================================`));
        console.log(``);
        // Query database

        db.query(`DELETE FROM department WHERE id = ${lostDepartment}`, function (err, results) {
          init();
        });
      });
  })
}

function deleteARole() {
  db.query(`SELECT role.title, role.id FROM role`, function (err, results) {
    if (err) throw err;
    const roleChoices = results.map((role) => {
      return {
        name: role.title,
        value: role.id
      };
    });
    inquirer

      .prompt([
        {
          type: 'list',
          name: 'deleteRole',
          message: 'Which role would you like to delete?',
          choices: roleChoices

        },
      ])
      .then((role) => {
        lostRole = role.deleteRole;
        console.log(``);
        console.log(chalk.cyan.bold(`==============================================================================================`));
        console.log(``);
        console.log(`Role Deleted`);
        console.log(``);
        console.log(chalk.cyan.bold(`==============================================================================================`));
        console.log(``);
        // Query database

        db.query(`DELETE FROM role WHERE id = ${lostRole}`, function (err, results) {
          init();
        })
      });
  });
}



function deleteAnEmployee() {
  db.query(`SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS name, employee.id FROM employee`, function (err, results) {
    if (err) throw err;
    const employeeChoices = results.map((emp) => {
      return {
        name: emp.name,
        value: emp.id
      };
    });
    console.log(employeeChoices);
    inquirer

      .prompt([
        {
          type: 'list',
          name: 'deleteEmployee',
          message: 'Which employee would you like to delete?',
          choices: employeeChoices

        },
      ])
      .then((emp) => {
        lostEmployee = emp.deleteEmployee;
        console.log(``);
        console.log(chalk.cyan.bold(`==============================================================================================`));
        console.log(``);
        console.log(`Employee Deleted: `);
        console.log(``);
        console.log(chalk.cyan.bold(`==============================================================================================`));
        console.log(``);
        // Query database

        db.query(`DELETE FROM employee WHERE id = ${lostEmployee}`, function (err, results) {
          init();
        })
      });
  });
}

function viewEmployeesByDepartment() {
  db.query(`SELECT * FROM department`, function (err, results) {
    if (err) throw err;
    const deptChoices = results.map((department) => {
      return {
        name: department.name,
        value: department.id
      };
    });
    inquirer.prompt([
      {
        type: 'list',
        name: 'empByDepartment',
        message: 'Which department would you like to view employees for?',
        choices: deptChoices

      },
    ])
      .then((dept) => {
        departmentViewed = dept.empByDepartment;
        // Query database

        db.query(`
        SELECT 
        CONCAT(employee.first_name, ' ', employee.last_name) AS name 
        FROM employee 
          JOIN role
          ON employee.role_id = role.id
          JOIN department
          ON role.department_id = department.id WHERE department.id = ${departmentViewed}`, function (err, results) {
            console.log(``);
            console.log(chalk.cyan.bold(`==============================================================================================`));
            console.log(``);
            console.table(results);
            console.log(``);
            console.log(chalk.cyan.bold(`==============================================================================================`));
            console.log(``);
            // console.log(err);
          init();
        });
      });
  })
}

init();
