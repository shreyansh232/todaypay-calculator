export const evaluateExpression = (expr) => {
  try {
    const sanitizedExpression = sanitizeExpression(expr);
    const result = eval(sanitizedExpression); // Use eval cautiously and only after sanitizing
    if (isNaN(result)) {
      return 'Error'; // Handle invalid expressions or errors during evaluation
    }
    return result.toString();
  } catch (error) {
    return 'Error';
  }
};

const sanitizeExpression = (expr) => {
  return expr
    .replace('÷', '/')
    .replace('×', '*')
    .replace(/(\d+(\.\d+)?)!/g, (_, n) => factorial(parseFloat(n)))
    .replace(/π/g, Math.PI)
    .replace(/e/g, Math.E)
    .replace(/(\d+(\.\d+)?)\^(\d+(\.\d+)?)/g, (match, base, _, exp) => Math.pow(base, exp))
    .replace(/(\d+(\.\d+)?)([sct])\((\d+(\.\d+)?)\)/g, (match, num, _, func, angle) => Math[func](angle));
};

// Factorial calculation
export const factorial = (n) => {
  if (n < 0) return NaN; // Handle negative numbers gracefully
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};