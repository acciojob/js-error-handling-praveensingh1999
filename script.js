class OutOfRangeError extends Error {
  constructor(arg) {
    super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
    this.name = "OutOfRangeError";
  }
}

class InvalidExprError extends Error {
  constructor() {
    super("Expression should not have an invalid combination of expression");
    this.name = "InvalidExprError";
  }
}

function evalString(expression) {
  try {
    // Remove spaces for easier validation
    const exp = expression.replace(/\s+/g, "");

    // 1. Check for OUT OF RANGE characters (anything not digit or + - * /)
    for (let char of exp) {
      if (!/[0-9+\-*/]/.test(char)) {
        throw new OutOfRangeError(char);
      }
    }

    // 2. Invalid combinations: ++, +-, *+, //, etc.
    if (/([+\-*/]{2,})/.test(exp)) {
      throw new InvalidExprError();
    }

    // 3. Starting with invalid operator (+,/ or *)
    if (/^[+/*]/.test(exp)) {
      throw new SyntaxError("Expression should not start with invalid operator");
    }

    // 4. Ending with invalid operator (+,/ ,* , -)
    if (/[+\-*/]$/.test(exp)) {
      throw new SyntaxError("Expression should not end with invalid operator");
    }

    // If valid, evaluate expression safely
    return eval(exp);

  } catch (error) {
    return error.message;
  }
}
