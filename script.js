//your code here
// -------- Custom Errors ---------

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

// -------------- Evaluator Function ----------------

function evalString(expression) {
  try {
    // Trim spaces
    let expr = expression.trim();

    // 1. Check for invalid characters
    // Allowed: digits, +, -, *, /, space
    for (let ch of expr) {
      if (!(/[0-9+\-*/ ]/.test(ch))) {
        throw new OutOfRangeError(ch);
      }
    }

    // Remove spaces for easier validation
    const noSpaceExpr = expr.replace(/\s+/g, "");

    // 2. Check invalid operator combinations (++, +*, /*, ---, etc.)
    if (/(\+{2,}|\-{2,}|[+\-*\/]{2,})/.test(noSpaceExpr)) {
      throw new InvalidExprError();
    }

    // 3. Expression should not start with +, *, /
    if (/^[+*/]/.test(noSpaceExpr)) {
      const err = new SyntaxError("Expression should not start with invalid operator");
      throw err;
    }

    // 4. Expression should not end with an operator (+, -, *, /)
    if (/[+\-*/]$/.test(noSpaceExpr)) {
      const err = new SyntaxError("Expression should not end with invalid operator");
      throw err;
    }

    // Everything valid → safely evaluate
    return eval(noSpaceExpr);

  } catch (error) {
    return error;
  }
}
