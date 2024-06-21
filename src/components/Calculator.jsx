import React from 'react';

const buttons = [
  ['(', ')', 'mc', 'm+', 'm-', 'mr', 'C', '+/-', '%', '÷'],
  ['2ⁿᵈ', 'x²', 'x³', 'xʸ', 'eˣ', '10ˣ', '7', '8', '9', '×'],
  ['1/x', '2√x', '3√x', 'y√x', 'ln', 'log₁₀', '4', '5', '6', '-'],
  ['x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '+'],
  ['Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', '0', '.', '=']
];

const Calculator = ({ handleButtonClick }) => {
  return (
    <div className="grid grid-cols-10 gap-0.5">
      {buttons.flat().map((btn, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(btn)}
          className={`${
            btn === '=' || btn === '÷' || btn === '×' || btn === '-' || btn === '+'
              ? 'bg-orange-500 text-white'
              : !isNaN(btn) || btn === '.' // Check if the button is a number or dot
              ? 'bg-gray-600 text-white' // Lighter shade for number buttons
              : 'bg-gray-700 text-white'
          } font-light py-4 text-xl h-16 ${btn === '0' ? 'col-span-2' : ''}`}
        >
          {btn}
        </button>
      ))}
    </div>
  );
};

export default Calculator;
