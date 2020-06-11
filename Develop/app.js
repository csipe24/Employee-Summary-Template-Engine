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

inquirer.prompt(questions).then((response)=>{
console.log(response);
});

// Ask the user for the position/role
function askForEmployeeRole(){

inquirer.prompt({
    type: "list",
    message: "What is the employee's role?",
    name: "role",
    choices: ["Engineer", "Intern"]
                })
        .then ((response)) =>{   
            if (response.role === "Engineer"){askforEngineerInfo();}
            else if ( response.role === "Intern"){askforInternInfo();}
                            };
}
}

// Ask for Manager Information

function askforManagerInfo(){
    inquirer.prompt([...employeeQuestions,
            {
                type: "input",
                message: "What is the employee phone number?",
                name: "name"
            },
        ])
            .then((response)=> {console.log(response)});
};

// Ask for Engineer Information
function askforEngineerInfo(){
    inquirer.prompt([...employeeQuestions,
        {
            type: "input",
            message: "What is the employee phone number?",
            name: "name"
        },
    ])
    // Build a new gineer
        .then((response)=> {console.log(response)});
};


function askforInternInfo(){
    inquirer.prompt([...employeeQuestions,
        {
            type: "input",
            message: "What is the employee school?",
            name: "school"
        },
    ])
        .then((response)=> {console.log(response)});
};


=
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
