import { useState, useCallback } from 'react';
import { getEmployees, deleteEmployee } from '../api/employeeApi';

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEmployees = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError('Failed to fetch employees');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleEdit = useCallback((employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback(async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        setEmployees(prev => prev.filter(emp => emp._id !== id));
      } catch (err) {
        console.error('Error deleting employee:', err);
        setError('Failed to delete employee');
      }
    }
  }, []);

  const openModal = useCallback(() => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  }, []);

  const handleFormSubmit = useCallback(() => {
    fetchEmployees();
    closeModal();
  }, [fetchEmployees, closeModal]);

  return {
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
  };
};
