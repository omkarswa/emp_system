import React from 'react';

const Header = ({ onAddEmployee }) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Employee Management System</h1>
      <button 
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
        onClick={onAddEmployee}
      >
        Add Employee
      </button>
    </header>
  );
};

export default Header;
