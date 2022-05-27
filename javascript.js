/**
 * 
 * Element object declarations start here.
 * 
 */

 const numBtnsList = document.querySelectorAll(".num");
 const memory = document.querySelector(".memory");
 const result = document.querySelector(".result");
 const opBtnsList = document.querySelectorAll(".op");
 const addBtn = document.querySelector(".add");
 const subtractBtn = document.querySelector(".subtract");
 const multiplyBtn = document.querySelector(".multiply");
 const divideBtn = document.querySelector(".divide");
 const equalsBtn = document.querySelector(".equals");
 const acBtn = document.querySelector(".ac");

 /**
 * 
 * Variable declarations start here.
 * 
 */

const data = {};
let digits = 1;
let count = 1;

/**
 * Rounds a number to 5 decimal places.
 * @param {number} a 
 * @returns {number} number rounded to 5 decimal places.
 */
 function roundToFive(a) {
    return +(Math.round(a + "e+5")  + "e-5");
}

/**
 * Adds two numbers and returns the sum.
 * @param {number} a 
 * @param {number} b 
 * @returns {number} sum of "a" and "b".
 */
function add(a, b) {
    return a + b;
}

/**
 * Subtracts two numbers and returns the difference.
 * @param {number} a 
 * @param {number} b 
 * @returns {number} difference of "a" and "b".
 */
function subtract(a, b) {
    return a - b;
}

/**
 * Multiplies two numbers and returns the product.
 * @param {number} a 
 * @param {number} b 
 * @returns {number} product of "a" and "b".
 */
function multiply(a, b) {
    return a * b;
}

/**
 * Divides two numbers and returns the quotient.
 * @param {number} a 
 * @param {number} b 
 * @returns {number} quotient of "a" and "b".
 */
function divide(a, b) {
    return roundToFive(a / b);
}

/**
 * Calls the corresponding operator function to perform calculation.
 * @param {string} op - Operator type.
 * @param {number} a 
 * @param {number} b 
 * @returns {number} answer of operator performed on numbers.
 */
function operate(op, a, b) {
    return op === "add" ? add(a, b)
        : op === "subtract" ? subtract(a, b)
        : op === "multiply" ? multiply(a, b)
        : divide(a, b);
}

/**
 * Displays each number on the screen as a number button is clicked
 * (max is 10 digits).
 */
function displayResult() {
    for (const btn of numBtnsList) {
        btn.addEventListener("click", e => {
            if (result.textContent === "0") {
                result.removeChild(result.firstChild);
                result.textContent = btn.textContent;
            } else {
                if (digits === 1) result.removeChild(result.firstChild);
                if (digits === 10) btn.disabled = true;
                result.textContent += btn.textContent;
            }
            digits++;
            count = 1;
        });
    }
}

/**
 * Displays the calculated equation above the result as each operator is clicked.
 * @param {string} op - Name of operator.
 */
function displayEquation(op) {
    if (data["sign"] === "add") {
        data["a"] = operate("add", data["a"], parseInt(result.textContent));
        result.textContent = data["a"];
        memory.textContent = `${data["a"]} + `;
    } else if (data["sign"] === "subtract") {
        data["a"] = operate("subtract", data["a"], parseInt(result.textContent));
        result.textContent = data["a"];
        memory.textContent = `${data["a"]} - `;
    } else if (data["sign"] === "multiply") {
        data["a"] = operate("multiply", data["a"], parseInt(result.textContent));
        result.textContent = data["a"];
        memory.textContent = `${data["a"]} ⨉ `;
    } else if (data["sign"] === "divide") {
        data["a"] = operate("divide", data["a"], parseInt(result.textContent));
        result.textContent = data["a"];
        memory.textContent = `${data["a"]} ÷ `;
    } else data["a"] = parseInt(result.textContent);
    data["sign"] = op;
    digits = 1;
    count++;
    memory.style.visibility = "visible";
    memory.textContent = op === "add" ? `${data["a"]} + `
        : op === "subtract" ? `${data["a"]} - `
        : op === "multiply" ? `${data["a"]} ⨉ `
        : `${data["a"]} ÷ `;
}

/**
 * 
 * Event listeners start here.
 * 
 */

window.addEventListener("pageshow", e => {
    displayResult();
    memory.style.visibility = "hidden";
});

addBtn.addEventListener("click", e => {
    if (count === 2) addBtn.removeEventListener("click", e);
    else displayEquation("add");
});

subtractBtn.addEventListener("click", e => {
    if (count === 2) subtractBtn.removeEventListener("click", e);
    else displayEquation("subtract");
});

multiplyBtn.addEventListener("click", e => {
    if (count === 2) multiplyBtn.removeEventListener("click", e);
    else displayEquation("multiply");
});

divideBtn.addEventListener("click", e => {
    if (count === 2) divideBtn.removeEventListener("click", e);
    else displayEquation("divide");
});

equalsBtn.addEventListener("click", e => {
    if ("a" in data === false) equalsBtn.removeEventListener("click", e);
    else if (data["sign"] === "equals") equalsBtn.removeEventListener("click", e);
    else {
        data["b"] = parseInt(result.textContent);
        result.textContent = operate(data["sign"], data["a"], data["b"]);
        data["a"] = result.textContent;
        data["sign"] = "equals";
    }
    memory.textContent += `${data["b"]} =`;
});

acBtn.addEventListener("click", e => {
    for (key in data) {
        delete data[key];
    }
    result.textContent = "0";
    memory.textContent = "0";
    memory.style.visibility = "hidden";
});