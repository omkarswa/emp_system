const API_URL = 'http://localhost:4000/api/employees';

// Get all employees
export const getEmployees = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

// Get single employee by ID
export const getEmployeeById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    
    if (!response.ok) {
      let errorMessage = 'Failed to fetch employee';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If we can't parse the error response, use the default message
      }
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching employee:', {
      error: error.message,
      id
    });
    throw error;
  }
};

// Create new employee
export const createEmployee = async (employeeData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });
    if (!response.ok) {
      throw new Error('Failed to create employee');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

// Update employee
export const updateEmployee = async (id, employeeData) => {
  try {
    // Ensure we're not sending the _id in the request body
    const { _id, ...dataToUpdate } = employeeData;
    
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToUpdate),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update employee');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};

// Delete employee
export const deleteEmployee = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete employee');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
};
