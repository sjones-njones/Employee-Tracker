const inquirer = require('inquirer');

const mysql = require('mysql2');


// const db = mysql.createConnection(
//   {
//     host: 'localhost',
//     // MySQL username,
//     user: 'root',
//     // MySQL password
//     password: 'rootr00t!',
//     database: 'classlist_db'
//   },
//   console.log(`Connected to the classlist_db database.`)
// );

// // Query database
// db.query('SELECT * FROM students', function (err, results) {
//   console.log(results);
// });
const options = [
  {
  type: 'list',
  name: 'options',
  message: 'What would you like to do?',
  choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
}
];

function init() {
  inquirer
  .prompt(options) 
  .then((choices) => { 
    console.log(choices);
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