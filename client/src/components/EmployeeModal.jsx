import React from 'react';
import EmployeeForm from './EmployeeForm';

const EmployeeModal = ({ employee, isOpen, onClose, onSubmit, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            {employee ? 'Edit Employee' : 'Add New Employee'}
          </h2>
          <EmployeeForm 
            employee={employee} 
            onSubmit={onSubmit} 
            onCancel={onClose} 
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
