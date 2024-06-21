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
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
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
        // Handle 2nd mode
        break;
      case 'x²':
        applyPower(2);
        break;
      case 'x³':
        applyPower(3);
        break;
      case 'x^y':
        setExpression(expression + '^');
        break;
      case 'eˣ':
        applyExponential(Math.E);
        break;
      case '10ˣ':
        applyExponential(10);
        break;
      case 'ln':
        applyLogarithm(Math.log);
        break;
      case 'log₁₀':
        applyLogarithm(Math.log10);
        break;
      case '1/x':
        applyInverse();
        break;
      case '2√x':
        applyRoot(2);
        break;
      case '3√x':
        applyRoot(3);
        break;
      case 'y√x':
        setExpression(expression + '√');
        break;
      case 'Rad':
        applyRadians();
        break;
      case 'sinh':
        applyHyperbolicFunction(Math.sinh);
        break;
      case 'cosh':
        applyHyperbolicFunction(Math.cosh);
        break;
      case 'tanh':
        applyHyperbolicFunction(Math.tanh);
        break;
      case 'π':
        setExpression(expression + 'π');
        break;
      case 'Rand':
        setExpression(Math.random().toString());
        break;
      case '+/-':
        negateExpression();
        break;
      case '%':
        applyPercentage();
        break;
      case 'EE':
        setExpression(expression + 'EE');
        break;
      default:
        appendToExpression(value);
        break;
    }

    setLastButtonClicked(value);
  };

  const evaluateAndSetExpression = () => {
    try {
      const result = evaluateExpression(expression);
      setExpression(result.toString());
      checkForConfetti(expression);
    } catch {
      setExpression('Error');
    }
  };

  const handleMemoryClear = () => {
    setMemoryValue(null);
  };

  const handleMemoryAdd = () => {
    try {
      const result = eval(expression);
      if (!isNaN(result)) {
        setMemoryValue((prevMemory) => (prevMemory !== null ? prevMemory + parseFloat(result) : parseFloat(result)));
      }
    } catch {
      setExpression('Error');
    }
  };

  const handleMemorySubtract = () => {
    try {
      const result = eval(expression);
      if (!isNaN(result)) {
        setMemoryValue((prevMemory) => (prevMemory !== null ? prevMemory - parseFloat(result) : -parseFloat(result)));
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
    setExpression((prevExpression) => prevExpression + value);
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
        const result = factorial(parseFloat(evaluateExpression(expression)));
        setExpression(result.toString());
      } else {
        setExpression(expression + '!');
      }
    } catch {
      setExpression('Error');
    }
  };

  const applyTrigonometricFunction = (trigFunction) => {
    try {
      const result = trigFunction(parseFloat(evaluateExpression(expression)));
      setExpression(result.toString());
    } catch {
      setExpression('Error');
    }
  };

  const applyPower = (power) => {
    try {
      const result = Math.pow(parseFloat(evaluateExpression(expression)), power);
      setExpression(result.toString());
    } catch {
      setExpression('Error');
    }
  };

  const applyExponential = (base) => {
    try {
      const result = Math.pow(base, parseFloat(evaluateExpression(expression)));
      setExpression(result.toString());
    } catch {
      setExpression('Error');
    }
  };

  const applyLogarithm = (logFunction) => {
    try {
      const result = logFunction(parseFloat(evaluateExpression(expression)));
      setExpression(result.toString());
    } catch {
      setExpression('Error');
    }
  };

  const applyInverse = () => {
    try {
      const result = 1 / parseFloat(evaluateExpression(expression));
      setExpression(result.toString());
    } catch {
      setExpression('Error');
    }
  };

  const applyRoot = (root) => {
    try {
      const result = Math.pow(parseFloat(evaluateExpression(expression)), 1 / root);
      setExpression(result.toString());
    } catch {
      setExpression('Error');
    }
  };

  const applyRadians = () => {
    try {
      const result = parseFloat(evaluateExpression(expression)) * (Math.PI / 180);
      setExpression(result.toString());
    } catch {
      setExpression('Error');
    }
  };

  const applyHyperbolicFunction = (hyperbolicFunction) => {
    try {
      const result = hyperbolicFunction(parseFloat(evaluateExpression(expression)));
      setExpression(result.toString());
    } catch {
      setExpression('Error');
    }
  };

  const negateExpression = () => {
    try {
      const result = parseFloat(evaluateExpression(expression)) * -1;
      setExpression(result.toString());
    } catch {
      setExpression('Error');
    }
  };

  const applyPercentage = () => {
    try {
      const result = parseFloat(evaluateExpression(expression)) / 100;
      setExpression(result.toString());
    } catch {
      setExpression('Error');
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} flex justify-center items-center`}>
      {triggerConfetti && <Confetti />}
      <div className={`bg-${theme === 'dark' ? 'gray-800' : 'white'} p-1 border border-gray-700 rounded-lg shadow-2xl w-full max-w-5xl`}>
        <div className={`mb-0 flex justify-end items-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300'} p-4 font-light rounded-t-lg h-24`}>
          <input
            className={`text-right w-full bg-transparent text-6xl ${theme === 'dark' ? 'text-white' : 'text-black'} outline-none`}
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
