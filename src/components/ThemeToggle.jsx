import React from 'react';
import PropTypes from 'prop-types';

function ThemeToggle({ toggleTheme, theme }) {
  return (
    <button
    className={`absolute bottom-48 right-1/2 transform translate-x-1/2 bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600`}
    onClick={toggleTheme}
  >
    {theme === 'dark' ? 'Light' : 'Dark'} Mode
  </button>
  );
}

ThemeToggle.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

export default ThemeToggle;
