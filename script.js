const validNumbers = "1234567890.";
const validOperators = ["+", "-", "*", "/", "^"];

const buttons = document.querySelector(".buttons");
const numbers = document.querySelector(".numbers");
const operators = document.querySelector(".operators");
const final = document.querySelector(".final");
const float = document.querySelector("#dot");
const input = document.querySelector(".input");

const display = document.querySelector(".display");

let nums = "";
let numFirst = "";
let operator = "";
let numSecond = "";

//computing functions
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
    return numFirst = Math.round(numFirst * 100) / 100;
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
        numFirst = Math.round(+(nums.join("")) * 100) / 100;
    if (operator == "/" && numSecond == 0) {
        alert("Cannot divide by 0.");
        clearAll();
    }
}

//input functions
function toggleFloat() {
    if (nums.includes(".")) float.disabled = true;
    if (nums.includes(".") && validOperators.find((operator) => nums.includes(operator)) ) {
        let operCheck = nums.split('');
        (nums.lastIndexOf(".") < getOperatorIndex(operCheck)) ? 
        float.disabled = false : float.disabled = true;
    }
}

function checkOperators() {
    let numCheck = nums.slice(1, --nums.length).split('');
    if (numCheck.find(operator => validOperators.includes(operator))) {
        compute(nums);
        display.value = numFirst;
        clearAll();
        nums = display.value;
    }
}

function clearString(string){
    if (string.at(-1) 
        == string.find(operator => validOperators.includes(operator))) 
        string.pop();
    string.join("").replace(/[^0-9.-]/g, "");
    console.log(string);
    return string.join("");
}

function clearAll() {
    nums = "";
    numFirst = "";
    operator = "";
    numSecond = "";
    float.disabled = false;
}

//event listeners
numbers.addEventListener("click", (event) => {
    let target = event.target;

    nums += target.textContent;
    display.textContent = nums;
    toggleFloat();
    
})

operators.addEventListener("click", (event) => {
    let target = event.target;
    checkOperators();
    nums += target.textContent;
    display.textContent = nums;
})

final.addEventListener("click", (event) => {
    let target = event.target;
    switch (target.id) {
        case "equal":
            compute(nums);
            display.textContent = numFirst;
            clearAll();
            break;
        case "clear":
            clearAll();
            display.textContent = null;
            break;
        case "backspace":
            nums = nums.slice(0, --nums.length);
            display.textContent = nums;
    }
})

input.addEventListener("keydown", (event) => {
    //had to specify 9 separately for the numpad ?? might be an issue with my keyboard

    if (event.keyCode >= 48 && event.keyCode <= 56 
        || event.keyCode >= 96 && event.keyCode <= 105 || event.key == "9") {
        nums += `${event.key}`;
        display.textContent = nums;
    } else if (event.key == "." && float.disabled == false) {
        nums += `${event.key}`;
        display.textContent = nums;
        toggleFloat();
    } else if (event.code == "Backspace") {
                nums = nums.slice(0, --nums.length);
                console.log(nums);
                display.textContent = nums;
        } else {       
            switch(event.code) {
                case "+":
                case "-":
                case "*":
                case "/":
                case "^":
                    checkOperators();
                    nums += `${event.key}`;
                    display.textContent = nums;
                    break;
                case "=":
                    compute(nums);
                    display.textContent = numFirst;
                    clearAll();
                case "Enter":
                    clearAll();
        } 
    }
    
})
