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
 const decimalBtn = document.querySelector(".decimal");
 const acBtn = document.querySelector(".ac");
 const delBtn = document.querySelector(".del");

 /**
 * 
 * Variable declarations start here.
 * 
 */

const data = {};
let digits = 0;
let numBtnClicks = 1;

/**
 * 
 * Function declarations start here.
 * 
 */

/**
 * Adds two numbers and returns the sum.
 * @param {number} a 
 * @param {number} b 
 * @returns {number} sum of "a" and "b".
 */
function add(a, b) {
    const sum = a + b;
    return (sum.toString().length > 9) ? sum.toExponential(3) : sum;
}

/**
 * Subtracts two numbers and returns the difference.
 * @param {number} a 
 * @param {number} b 
 * @returns {number} difference of "a" and "b".
 */
function subtract(a, b) {
    const diff = a - b;
    return (diff.toString().length > 9) ? diff.toExponential(3) : diff;
}

/**
 * Multiplies two numbers and returns the product.
 * @param {number} a 
 * @param {number} b 
 * @returns {number} product of "a" and "b".
 */
function multiply(a, b) {
    const product = a * b;
    return (product.toString().length > 9) ? product.toExponential(3) : product;
}

/**
 * Divides two numbers and returns the quotient.
 * @param {number} a 
 * @param {number} b 
 * @returns {number} quotient of "a" and "b".
 */
function divide(a, b) {
    const quotient = a / b;
    return (quotient.toString().length > 9) ? quotient.toExponential(3)
        : b === 0 ? "ERROR"
        : quotient;
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
 * Clears all data stored in the calculator.
 */
function clearData() {
    for (key in data) {
        delete data[key];
    }
    digits = 0;
    result.textContent = "0";
    memory.textContent = "0";
    memory.style.visibility = "hidden";
}

/**
 * Calculates and updates the values of both the equation and result based
 * on which operator is clicked.
 * @param {string} op - Name of operator.
 */
function updateValues(op) {
    data["a"] = operate(op, data["a"], parseFloat(result.textContent));
    result.textContent = data["a"];
    memory.textContent = op === "add" ? `${data["a"]} + `
        : op === "subtract" ? `${data["a"]} - `
        : op === "multiply" ? `${data["a"]} ??? `
        : `${data["a"]} ?? `;
}

/**
 * Displays each number on the screen as a number button is clicked
 * (max is 9 digits).
 */
function displayResult() {
    for (const btn of numBtnsList) {
        btn.addEventListener("click", e => {
            if (data["sign"] === "equals" && !result.textContent.includes(".")) clearData();
            if (result.textContent === "0") {
                result.removeChild(result.firstChild);
                result.textContent = btn.textContent;
            } else {
                if (digits === 0 && result.textContent[result.textContent.length - 1] !== ".") {
                    result.removeChild(result.firstChild);
                }
                if (digits > 8) btn.removeEventListener("click", e);
                else result.textContent += btn.textContent;
            }
            digits++;
            numBtnClicks = 1;
        });
    }
}

/**
 * Displays the calculated equation above the result as each operator is clicked.
 * @param {string} op - Name of operator.
 */
function displayEquation(op) {
    if (result.textContent === "ERROR") {
        result.textContent = "0";
        data["a"] = 0;
        data["sign"] = op;
    }
    const canUpdate = () => { return data["sign"] === op && numBtnClicks < 3; };
    if (data["sign"] === "add" && canUpdate()) updateValues("add");
    else if (data["sign"] === "subtract" && canUpdate()) updateValues("subtract");
    else if (data["sign"] === "multiply" && canUpdate()) updateValues("multiply");
    else if (data["sign"] === "divide" && canUpdate()) updateValues("divide");
    else if (data["sign"] === "equals") data["sign"] = op;
    else if ("a" in data === false) data["a"] = parseFloat(result.textContent);
    else if (numBtnClicks === 1) {
        data["a"] = operate(data["sign"], data["a"], parseFloat(result.textContent));
        result.textContent = data["a"];
     }
    data["sign"] = op;
    if (result.textContent !== "ERROR") {
        data["a"] = parseFloat(result.textContent);
        memory.style.visibility = "visible";
        memory.textContent = op === "add" ? `${data["a"]} + `
            : op === "subtract" ? `${data["a"]} - `
            : op === "multiply" ? `${data["a"]} ??? `
            : `${data["a"]} ?? `;
    } else memory.style.visibility = "hidden";
    digits = 0;
    numBtnClicks++;
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
    if (numBtnClicks === 2 && data["sign"] === "add") addBtn.removeEventListener("click", e);
    else displayEquation("add");
});

subtractBtn.addEventListener("click", e => {
    if (numBtnClicks === 2 && data["sign"] === "subtract") subtractBtn.removeEventListener("click", e);
    else displayEquation("subtract");
});

multiplyBtn.addEventListener("click", e => {
    if (numBtnClicks === 2 && data["sign"] === "multiply") multiplyBtn.removeEventListener("click", e);
    else displayEquation("multiply");
});

divideBtn.addEventListener("click", e => {
    if (numBtnClicks === 2 && data["sign"] === "divide") divideBtn.removeEventListener("click", e);
    else displayEquation("divide");
});

equalsBtn.addEventListener("click", e => {
    if ("a" in data === false ||
        data["sign"] === "equals" ||
        data["a"] === "ERROR"
    ) {
        equalsBtn.removeEventListener("click", e);
    } else {
        data["b"] = parseFloat(result.textContent);
        result.textContent = operate(data["sign"], data["a"], data["b"]);
        data["a"] = parseFloat(result.textContent);
        if (isNaN(data["a"])) data["a"] = 0;
        data["sign"] = "equals";
        memory.textContent += `${data["b"]} =`;
    }
    digits = 0;
});

acBtn.addEventListener("click", e => clearData());

delBtn.addEventListener("click", e => {
    if (data["sign"] === "equals") delBtn.removeEventListener("click", e);
    else {
        if (result.textContent[result.textContent.length - 1] !== ".") digits--;
        result.textContent = result.textContent.slice(0, result.textContent.length - 1);
        if (result.textContent === "") result.textContent = "0";
    }
});

decimalBtn.addEventListener("click", e => {
    if ("a" in data === false && result.textContent.includes(".") ||
        data["a"] !== parseFloat(result.textContent) && result.textContent.includes(".")
    ) {
        decimalBtn.removeEventListener("click", e);
    }
    else if (digits === 0) result.textContent = "0.";
    else result.textContent += ".";
});