import React, { useState } from 'react';
import './index.css';

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

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  const handleButtonClick = (value) => {
    if (value === 'C') {
      setExpression('');
    } else if (value === '=') {
      try {
        setExpression(eval(expression.replace('÷', '/').replace('×', '*')).toString());
      } catch {
        setExpression('Error');
      }
    } else {
      setExpression(expression + value);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-gray-800 flex justify-center items-center`}>
      <div className="bg-gray-800 p-1 rounded-lg shadow-2xl w-full max-w-4xl border border-black">
        <div className="mb-0 flex justify-end items-center bg-gray-800 p-4 rounded-t-lg h-24">
          <input
            className="text-right w-full bg-transparent font-light text-6xl text-white outline-none"
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
