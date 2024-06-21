import React, { useState } from 'react';
import './index.css';
import ConfettiExplosion from 'react-confetti-explosion';

const buttons = [
  ['(', ')', 'mc', 'm+', 'm-', 'mr', 'C', '+/-', '%', '÷'],
  ['2nd', 'x²', 'x³', 'xy', 'eˣ', '10ˣ', '7', '8', '9', '×'],
  ['1/x', '2√x', '3√x', 'y√x', 'ln', 'log₁₀', '4', '5', '6', '-'],
  ['x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '+'],
  ['Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', '0', '.', '=']
];

function App() {
  const [theme, setTheme] = useState('dark');
  const [expression, setExpression] = useState('');
  const [triggerConfetti, setTriggerConfetti] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  const handleButtonClick = (value) => {
    if (value === 'C') {
      setExpression('');
    } else if (value === '=') {
      try {
        const result = evaluateExpression(expression);
        checkForConfetti(expression);
        setExpression(result);
      } catch {
        setExpression('Error');
      }
    } else {
      setExpression(expression + value);
    }
  };

  const evaluateExpression = (expr) => {
    const sanitizedExpression = expr
      .replace('÷', '/')
      .replace('×', '*')
      .replace('π', Math.PI)
      .replace(/(\d+(\.\d+)?)!/g, (match, n) => factorial(parseFloat(n)))
      .replace(/(\d+(\.\d+)?)\^(\d+(\.\d+)?)/g, (match, base, _, exp) => Math.pow(base, exp))
      .replace(/(\d+(\.\d+)?)([sct])\((\d+(\.\d+)?)\)/g, (match, num, _, func, angle) => Math[func](angle));

    return eval(sanitizedExpression).toString();
  };

  const factorial = (n) => {
    if (n < 0) return 'NaN';
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  const checkForConfetti = (expr) => {
    const operands = expr.match(/(\d+(\.\d+)?)/g);
    if (operands && operands.includes('5') && operands.includes('6')) {
      setTriggerConfetti(true);
      setTimeout(() => setTriggerConfetti(false), 4000);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-gray-800 flex justify-center items-center`}>
      {triggerConfetti && <ConfettiExplosion />}
      <div className="bg-gray-800 p-1 border border-gray-700 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="mb-0 flex justify-end items-center bg-gray-800 p-4 font-light rounded-t-lg h-24">
          <input
            className="text-right w-full bg-transparent text-6xl text-white outline-none"
            type="text"
            value={expression}
            readOnly
          />
        </div>
        <div className="grid grid-cols-10 gap-0.5">
          {buttons.flat().map((btn, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(btn)}
              className={`${
                btn === '=' || btn === '÷' || btn === '×' || btn === '-' || btn === '+'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-700 text-white'
              } font-light py-4 text-xl h-16 ${btn === '0' ? 'col-span-2' : ''}`}
            >
              {btn}
            </button>
          ))}
          
        </div>
        
      </div>
    </div>
  );
}

export default App;
