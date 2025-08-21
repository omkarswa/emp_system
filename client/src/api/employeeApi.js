const API_URL = "http://localhost:4000/api/employees"; 

// Fetch all employees
export async function getEmployees() {
  const res = await fetch(API_URL);
  return res.json();
}

// Add new employee
export async function addEmployee(employee) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  return res.json();
}

// Update employee
export async function updateEmployee(id, employee) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  return res.json();
}

// Delete employee
export async function deleteEmployee(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return res.json();
}
