const inquirer = require('inquirer');
const renderDepartmentTable = require('./lib/renderDepartmentTable');
const renderAllRolesTable = require('./lib/renderAllRolesTable');
const renderEmployeeDataTable = require('./lib/renderEmployeeDataTable');



const userOptions = [
  {
    type: 'list',
    name: 'options',
    message: 'What would you like to do?',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
  }
];

function init() {
  inquirer
    .prompt(userOptions)
    .then((opt) => {
      const userChoice = opt.options;

      console.log(userChoice);
      if (userChoice === 'view all departments') {
        renderDepartmentTable();
      }
      else if (userChoice === 'view all roles') {
      renderAllRolesTable();
       }
       else if (userChoice==='view all employees') {
        renderEmployeeDataTable();
       }
    });
}



//   {
//     type: 'input',
//     message: 'What is your user name?',
//     name: 'username',
//   },
//   {
//     type: 'password',
//     message: 'What is your password?',
//     name: 'password',
//   },
//   {
//     type: 'password',
//     message: 'Re-enter password to confirm:',
//     name: 'confirm',
//   },
// ])
// .then((response) =>
//   response.confirm === response.password
//     ? console.log(response.username)
//     : console.log('You forgot your password already?!')
// );
init();