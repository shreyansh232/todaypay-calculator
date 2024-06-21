import React, { useState } from 'react';
import './index.css';
import Confetti from './components/Confetti';
import Calculator from './components/Calculator';
import ThemeToggle from './components/ThemeToggle';
import { evaluateExpression, factorial } from './utils/calculatorUtils';

function App() {
  const [theme, setTheme] = useState('dark');
  const [expression, setExpression] = useState('');
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const [memoryValue, setMemoryValue] = useState(null);
  const [lastButtonClicked, setLastButtonClicked] = useState(null);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleButtonClick = (value) => {
    switch (value) {
      case 'sin':
        applyTrigonometricFunction(Math.sin);
        break;
      case 'cos':
        applyTrigonometricFunction(Math.cos);
        break;
      case 'tan':
        applyTrigonometricFunction(Math.tan);
        break;
      case 'e':
        setExpression(expression + 'e');
        break;
      case 'x!':
        applyFactorial();
        break;
      case 'C':
        setExpression('');
        break;
      case '=':
        evaluateAndSetExpression();
        break;
      case 'mc':
        handleMemoryClear();
        break;
      case 'm+':
        handleMemoryAdd();
        break;
      case 'm-':
        handleMemorySubtract();
        break;
      case 'mr':
        handleMemoryRecall();
        break;
      case '2nd':
        // Toggles between primary and secondary functions (not implemented)
        break;
      default:
        appendToExpression(value);
        break;
    }

    setLastButtonClicked(value);
  };

  const applyTrigonometricFunction = (func) => {
    try {
      const num = parseFloat(expression);
      if (!isNaN(num)) {
        const result = func(num);
        if (!isNaN(result)) {
          setExpression(result.toString());
        } else {
          setExpression('Error: Invalid input');
        }
      } else {
        setExpression('Error: Invalid input');
      }
    } catch (error) {
      console.error('Error applying trigonometric function:', error);
      setExpression('Error: Calculation error');
    }
  };
  

  const evaluateAndSetExpression = () => {
    try {
      const result = evaluateExpression(expression);
      checkForConfetti(expression);
      setExpression(result.toString());
    } catch {
      setExpression('Error');
    }
  };

  const handleMemoryClear = () => {
    setMemoryValue(null);
  };

  const handleMemoryAdd = () => {
    try {
      const result = evaluateExpression(expression);
      if (!isNaN(result)) {
        setMemoryValue(memoryValue !== null ? memoryValue + parseFloat(result) : parseFloat(result));
      }
    } catch {
      setExpression('Error');
    }
  };

  const handleMemorySubtract = () => {
    try {
      const result = evaluateExpression(expression);
      if (!isNaN(result)) {
        setMemoryValue(memoryValue !== null ? memoryValue - parseFloat(result) : -parseFloat(result));
      }
    } catch {
      setExpression('Error');
    }
  };

  const handleMemoryRecall = () => {
    if (memoryValue !== null) {
      setExpression(memoryValue.toString());
    }
  };

  const appendToExpression = (value) => {
    setExpression(expression + value);
  };

  const checkForConfetti = (expr) => {
    const operands = expr.match(/(\d+(\.\d+)?)/g);
    if (operands && operands.includes('5') && operands.includes('6')) {
      setTriggerConfetti(true);
      setTimeout(() => setTriggerConfetti(false), 4000);
    }
  };

  const applyFactorial = () => {
    try {
      const lastChar = expression.slice(-1);
      if (!isNaN(lastChar) || lastChar === ')') {
        const result = factorial(parseFloat(expression));
        setExpression(result.toString());
      } else {
        setExpression(expression + '!');
      }
    } catch {
      setExpression('Error');
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-gray-800 flex justify-center items-center`}>
      {triggerConfetti && <Confetti />}
      <div className={`bg-gray-800 p-1 border border-gray-700 rounded-lg shadow-lg w-full max-w-4xl ${theme === 'dark' ? 'dark' : ''}`}>
        <div className={`mb-0 flex justify-end items-center bg-gray-800 p-4 font-light rounded-t-lg h-24 ${theme === 'dark' ? 'dark' : ''}`}>
          <input
            className="text-right w-full bg-transparent text-6xl text-white outline-none"
            type="text"
            value={expression}
            readOnly
          />
        </div>
        <Calculator handleButtonClick={handleButtonClick} theme={theme} />
        <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
      </div>
    </div>
  );
}

export default App;
