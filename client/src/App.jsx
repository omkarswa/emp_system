import { useEffect, useState } from "react";
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from "./api/employeeApi";

function App() {
  const [employees, setEmployees] = useState([]);
  const [newEmp, setNewEmp] = useState({ firstName: "", lastName: "" });

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    const data = await getEmployees();
    setEmployees(data);
  }

  async function handleAdd() {
    await addEmployee(newEmp);
    setNewEmp({ firstName: "", lastName: "" });
    loadEmployees();
  }

  async function handleDelete(id) {
    await deleteEmployee(id);
    loadEmployees();
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Employee Management</h1>

      <div className="mb-4">
        <input
          placeholder="First Name"
          value={newEmp.firstName}
          onChange={e => setNewEmp({ ...newEmp, firstName: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          placeholder="Last Name"
          value={newEmp.lastName}
          onChange={e => setNewEmp({ ...newEmp, lastName: e.target.value })}
          className="border p-2 mr-2"
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2">
          Add
        </button>
      </div>

      <ul>
        {employees.map(emp => (
          <li key={emp._id} className="mb-2">
            {emp.firstName} {emp.lastName} - {emp.department}
            <button
              onClick={() => handleDelete(emp._id)}
              className="ml-4 bg-red-500 text-white px-2 py-1"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
