const validNumbers = "1234567890.";
const validOperators = ["+", "-", "*", "/", "^"];

const buttons = document.querySelector(".buttons");
const display = document.querySelector(".display");

let nums = [];
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

function splitNums(nums) {
    let operatorIndex = nums.findLastIndex((operator) => {
        return validOperators.includes(operator);
    })
    numFirst += nums.slice(0, operatorIndex).join("");
    numSecond += nums.slice(++operatorIndex).join("");
    operator = nums[--operatorIndex];
    operate(+numFirst, operator, +numSecond);
    display.value = numFirst;
    console.log(numFirst);
}

buttons.addEventListener("click", (event) => {
    let target = event.target;
    if (target.id == "equal") {
        splitNums(nums);
    } else
        {nums.push(target.textContent);
        display.value = nums.join("");
        console.log(nums);}



})
