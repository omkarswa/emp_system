import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../api/employeeApi";

function EmployeeList({ onEdit }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const { data } = await getEmployees();
    setEmployees(data);
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Employees</h2>
      <ul className="space-y-2">
        {employees.map((emp) => (
          <li key={emp._id} className="flex justify-between items-center border p-2 rounded">
            <div>
              <p className="font-semibold">{emp.firstName} {emp.lastName}</p>
              <p className="text-sm text-gray-600">{emp.email} | {emp.department}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-yellow-500 text-white rounded"
                onClick={() => onEdit(emp)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded"
                onClick={() => handleDelete(emp._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
