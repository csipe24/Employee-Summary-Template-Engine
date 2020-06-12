const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const employeeQuestions = [
    {
        type: "input",
        message: "What is the employee name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the employee ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What is the employee email?",
        name: "email"
    },
];

// Ask the user for the position/role
function askForEmployeeRole(){
    console.log("----------------");
    console.log("Adding Team Member");
    console.log("----------------");
    inquirer.prompt(
        {type: "list",
        message: "What is the employee's role?",
        name: "role",
        choices: ["Engineer", "Intern"]})
            .then ((response) => {   
                if (response.role === "Engineer"){askforEngineerInfo()}
                else if ( response.role === "Intern"){askforInternInfo()}
                });
};

// Ask to add another employee
function askToAddEmployee(){
    inquirer.prompt(
        {type: "list",
        message: "Would you like to add another employee?",
        name: "addEmployee",
        choices: ["Yes", "No"]})
        .then(({addEmployee}) => {
            if(addEmployee === "Yes"){askForEmployeeRole();}
            else{createHTML();
            }
        });
    };

// Ask for Manager Information
function askforManagerInfo(){
    console.log("Add a new MGR");
    console.log("----------------");
    inquirer.prompt([...employeeQuestions,
            {type: "input",
            message: "What is the employee phone number?",
            name: "phone"},])
            .then(({name, id, email, phone}) => {
                employees.push( new Manager (name, id, email, phone));
                askForEmployeeRole();
            })
};

// Ask for Engineer Information
function askforEngineerInfo(){
    console.log("Add a new Engineer");
    console.log("----------------");
    inquirer.prompt([...employeeQuestions,
        {type: "input",
        message: "What is the employee's github username?",
        name: "github"
        }])
        .then(({name, id, email, github}) => {
        // Build a new engineer & Add new engineer to a list
        employees.push( new Engineer (name, id, email, github));
        // Ask user to add another employee
        askToAddEmployee();
        });
};


function askforInternInfo(){
    console.log("Add a new Intern");
    console.log("----------------");
    inquirer.prompt([...employeeQuestions,
        {type: "input",
        message: "What is the intern's school?",
        name: "school"}])
        .then(({name, id, email, school}) => {
            // Build a new intern & add new intern to a list
            employees.push( new Intern (name, id, email, school));
            // Ask user to add another employee
            askToAddEmployee();
            });
};

function createHTML() {
    const html = render(employees);
    console.log("Team Built");
    console.log(employees);
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
    }

    fs.writeFile(outputPath, html, (err) =>{
        if(err){console.log(err);}
        else { console.log("HTML Created Successfully")}
    })
}

askforManagerInfo();
