export const evaluateExpression = (expr) => {
  const sanitizedExpression = expr
    .replace('÷', '/')
    .replace('×', '*')
    .replace(/(\d+(\.\d+)?)!/g, (match, n) => factorial(parseFloat(n)))
    .replace(/π/g, Math.PI)
    .replace(/e/g, Math.E)
    .replace(/(\d+(\.\d+)?)\^(\d+(\.\d+)?)/g, (match, base, _, exp) => Math.pow(base, exp))
    .replace(/(\d+(\.\d+)?)([sct])\((\d+(\.\d+)?)\)/g, (match, num, _, func, angle) => Math[func](angle));

  return eval(sanitizedExpression).toString();
};

// Factorial calculation
export const factorial = (n) => {
  if (n < 0) return 'NaN';
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};
