/**
 * 
 * Element object declarations start here.
 * 
 */

 const numBtnsList = document.querySelectorAll(".num");
 const result = document.querySelector(".result");

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
 * Displays the result as each number button is clicked and saves the result
 * into resultValue.
 */
function displayResult() {
    for (const button of numBtnsList) {
        button.addEventListener("click", e => {
            if (result.textContent === "0") result.removeChild(result.firstChild);
            if (result.textContent.length === 10) button.removeEventListener("click", e);
            else {
                result.textContent = result.textContent ? result.textContent += button.textContent
                    : button.textContent;
                resultValue = result.textContent;
            }
        });
    }
}

/**
 * 
 * Variable declarations start here.
 * 
 */

let resultValue = 0;

/**
 * 
 * Event listeners start here.
 * 
 */

window.addEventListener("pageshow", e => {
    displayResult();
});