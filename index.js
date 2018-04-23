//Environment Vars
const arguments = process.argv;
const regex = /^([+-]?\d+\.?\d*)([+\-x\/]?)([+-]?\d+\.?\d*)?$/g;

//Formula to solve / converting german floating into english format
arguments.splice(0, 2);
const formula = arguments.join('').replace(',', '.');

//finds operator and operands in string
const matches = regex.exec(formula);

/*=== Error Handling ===*/

function die (errorMessage, errorCode, condition) {
    if (!condition) return;
    console.error("\x1b[41m \x1b[0m \x1b[31m" + errorMessage + "\x1b[0m");
    process.exit(errorCode);
}

die("No arguments given", 1, arguments.length === 0);
die("This was not a normal math form. You are only allowed to use integers and floats. Pleace notice to use the operators +, -, x, / only one time", 2,  matches === null);
die("Operator missing", 5, matches[2] === '');
die("First operand missing", 6, matches[1] === undefined);
die("Second operand missing", 7, matches[3] === undefined);

/*=== Math Operation Identifier ===*/

function mathFunc (o, a, b) {
    //converts string numbers in integer/float
    a = parseFloat(a);
    b = parseFloat(b);

    die("Division with zero", 4, b === 0 && o === "/");

    //Router for operations
    switch (o) {
        case "+":
            return addService (a, b);
        case "-":
            return subService (a, b);
        case "/":
            return divService (a, b);
        case "x":
            return mulService (a, b);
    }
}

/*=== Math Operations ===*/

function addService (a, b) {
    return a + b;
}

function subService (a, b) {
    return a - b;
}

function divService (a, b) {
    return a / b;
}

function mulService (a, b) {
    return a * b;
}

/*=== Formula Parser ===*/

//extracts operator type
let operator = matches[2];

//extracts operands
let number1 = matches[1];
let number2 = matches[3];

//execute operation
let result = mathFunc(operator, number1, number2);

/*=== Final Output View ===*/

console.log("\x1b[42m \x1b[0m \x1b[32mYour result is: " + result + "\x1b[0m");