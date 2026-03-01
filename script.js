const validNumbers = "1234567890.";
const validOperators = ["+", "-", "*", "/", "^"];

const buttons = document.querySelector(".buttons");
const numbers = document.querySelector(".numbers");
const operators = document.querySelector(".operators");

const display = document.querySelector(".display");

let nums = "";
let numFirst = "";
let operator = "";
let numSecond = "";


function add(a, b) {
    return numFirst = a + b;
}

function subtract(a, b) {
    return numFirst = a - b;
}

function multiply(a,b) {
    return numFirst = a * b;
}

function divide(a, b) {
    return numFirst = a / b;
}

function toPower(a, b) {
    return numFirst = a ** b;
}

function operate(a, operator, b) {
    switch (operator) {
        case "+":
            add(a, b);
            break;
        case "-":
            subtract(a, b);
            break;
        case "*":
            multiply(a, b);
            break;
        case "/":
            divide(a, b);
            break
        case "^":
            toPower(a, b);
    }
}

function clearAll() {
    nums = "";
    numFirst = "";
    operator = "";
    numSecond = "";
}

function clearString(string){
    if (string.at(-1) == "-") string.pop();
    string.join("").replace(/[^0-9.-]/g, "");
    console.log(string);
    return string.join("");
}

function getOperatorIndex(nums) {
    let mulDivPower = ["*", "/", "^"];
    let isMulDivPower = nums.some(operator => 
        mulDivPower.includes(operator));

    if (isMulDivPower == true) {
        return operatorIndex = nums.findLastIndex((operator) => {
        return mulDivPower.includes(operator);
        })
    } else {
        return operatorIndex = nums.findLastIndex((operator) => {
        return validOperators.includes(operator);
        })
    }
}

function compute(nums) {
    //find operator
    nums = nums.split("");
    let operatorIndex = getOperatorIndex(nums);

    //fill variables
    numFirst = clearString(nums.slice(0, operatorIndex));
    numSecond = clearString(nums.slice(++operatorIndex));
    operator = nums[--operatorIndex];

    //perform math with failsafes
    operate(+numFirst, operator, +numSecond);
    if (operatorIndex == -1 || numSecond == undefined) 
        numFirst = +(nums.join(""));
}

buttons.addEventListener("click", (event) => {
    let target = event.target;
    
    if (target.id == "equal") {
        compute(nums);
        display.value = numFirst;
        console.log(numFirst, numSecond, operator);
        clearAll();
    } else
        {nums += target.textContent;
        display.value = nums;
        console.log(nums);}



})
