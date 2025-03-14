export function evaluateExpression(expression) {
  // Using regular expression to split the expression into operands and operator

  if (expression === "") {
    return 0
  }

  var match = expression.match(/^(\d+)(?:\s*([\+\-\*\/])\s*(\d+))?$/)

  if (!match) {
    throw new Error("Invalid expression format")
  }

  var operand1 = parseInt(match[1])

  // Check if there is an operator and a second operand
  if (match[2] && match[3]) {
    var operator = match[2]
    var operand2 = parseInt(match[3])

    // Performing the calculation based on the operator
    switch (operator) {
      case "+":
        return operand1 + operand2
      case "-":
        return operand1 - operand2
      case "*":
        return operand1 * operand2
      case "/":
        return operand1 / operand2
      default:
        throw new Error("Invalid operator")
    }
  } else {
    // If there is no operator and second operand, return the single operand
    return operand1
  }
}

// Example usage:
// var result = evaluateExpression("4+3");
// console.log(result);
