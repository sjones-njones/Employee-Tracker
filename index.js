const inquirer = require('inquirer');
const renderDepartmentTable = require('./lib/renderDepartmentTable');
const renderAllRolesTable = require('./lib/renderAllRolesTable');
const renderEmployeeDataTable = require('./lib/renderEmployeeDataTable');
const addADepartment = require('./lib/addADepartment');
const addARole = require('./lib/addARole');
const addAnEmployee = require('./lib/addAnEmployee');
const updateAnEmployee =require('./lib/updateAnEmployee');

const userOptions = [
  {
    type: 'list',
    name: 'options',
    message: 'What would you like to do?',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
  }
];

const init = function () {
  inquirer
    .prompt(userOptions)
    .then((opt) => {
      const userChoice = opt.options;

      console.log(userChoice);
      if (userChoice === 'view all departments') {
        renderDepartmentTable(init);
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
      else {
        updateAnEmployee();
      }
    });
}



init();
