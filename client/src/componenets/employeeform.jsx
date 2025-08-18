import React, { useState, useEffect } from "react";
import { addEmployee, updateEmployee } from "../api/employeeApi";

function EmployeeForm({ selectedEmployee, refresh, clearSelection }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    role: "",
    salary: ""
  });

  useEffect(() => {
    if (selectedEmployee) setForm(selectedEmployee);
  }, [selectedEmployee]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form._id) {
      await updateEmployee(form._id, form);
    } else {
      await addEmployee(form);
    }
    refresh();
    clearSelection();
    setForm({ firstName: "", lastName: "", email: "", department: "", role: "", salary: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded-lg mt-4">
      <h2 className="text-xl font-bold mb-4">{form._id ? "Edit Employee" : "Add Employee"}</h2>
      <div className="grid grid-cols-2 gap-4">
        <input className="border p-2 rounded" placeholder="First Name" name="firstName" value={form.firstName} onChange={handleChange} />
        <input className="border p-2 rounded" placeholder="Last Name" name="lastName" value={form.lastName} onChange={handleChange} />
        <input className="border p-2 rounded" placeholder="Email" name="email" value={form.email} onChange={handleChange} />
        <input className="border p-2 rounded" placeholder="Department" name="department" value={form.department} onChange={handleChange} />
        <input className="border p-2 rounded" placeholder="Role" name="role" value={form.role} onChange={handleChange} />
        <input className="border p-2 rounded" placeholder="Salary" name="salary" value={form.salary} onChange={handleChange} />
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" type="submit">
        {form._id ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default EmployeeForm;
