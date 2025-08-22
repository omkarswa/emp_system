import React, { useEffect } from 'react';
import { useEmployees } from './hooks/useEmployees';
import EmployeeList from './components/EmployeeList';
import EmployeeModal from './components/EmployeeModal';
import Header from './components/Header';

function App() {
  const {
    employees,
    editingEmployee,
    isModalOpen,
    isLoading,
    error,
    fetchEmployees,
    handleEdit,
    handleDelete,
    openModal,
    closeModal,
    handleFormSubmit,
  } = useEmployees();

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Display loading state
  if (isLoading && employees.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading employees...</p>
        </div>
      </div>
    );
  }

  // Display error state
  if (error && employees.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={fetchEmployees}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header onAddEmployee={openModal} />

        <main className="bg-white rounded-lg shadow overflow-hidden">
          <EmployeeList 
            employees={employees} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
            isLoading={isLoading}
          />
        </main>

        <EmployeeModal
          employee={editingEmployee}
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
}

export default App;