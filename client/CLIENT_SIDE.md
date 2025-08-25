# Client-Side Documentation

## Architecture Overview
- **Framework**: React
- **State Management**: Context API + useReducer
- **Styling**: CSS Modules
- **HTTP Client**: Fetch API

## Project Structure
```
client/
├── src/
│   ├── api/               # API client functions
│   ├── components/        # Reusable UI components
│   ├── context/           # Context providers
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Root component
│   └── main.jsx           # Application entry point
```

## Key Components

### 1. Employee Management
- **EmployeeList**: Displays all employees in a table
- **EmployeeForm**: Form for adding/editing employees
- **EmployeeModal**: Modal wrapper for forms
- **Header**: Navigation and page title

### 2. State Management
- **useEmployees Hook**: Centralized state management
  - Manages employees list, loading, and error states
  - Provides CRUD operations
  - Handles API communication

## API Integration

### Employee API (employeeApi.js)
```javascript
const API_URL = 'http://localhost:4000/api/employees';

export const getEmployees = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createEmployee = async (employee) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee)
  });
  return response.json();
};

// Other CRUD operations...
```

## State Management Flow
1. **Initial Load**:
   - App mounts → Fetches employees
   - Updates context state
   - Renders EmployeeList

2. **Add Employee**:
   - User fills form → Submits
   - API call → Updates state
   - UI re-renders with new employee

3. **Edit Employee**:
   - User clicks edit
   - Pre-fills form with employee data
   - On submit → API call → State update

4. **Delete Employee**:
   - User confirms deletion
   - API call → State update
   - UI re-renders without deleted employee

## Error Handling
- Try-catch in API calls
- Error boundaries
- User-friendly error messages
- Loading states for better UX

## Best Practices
- Component composition
- Prop types validation
- Memoization for performance
- Responsive design
- Accessible UI components
