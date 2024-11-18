const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const {
  getDepartmentById,
  getDepartments,
  getEmployeeById,
  getEmployees,
} = require('../BD6.6_HW11/controllers/index');

app.use(express.json());
app.use(cors());

app.get('/api/employees', async (req, res) => {
  try {
    const employees = await getEmployees();
    if (employees.length === 0) {
      return res.status(404).json({ error: 'No employees found' });
    }
    return res.status(200).json({ employees });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/employees/:id', async (req, res) => {
  try {
    const employee = await getEmployeeById(parseInt(req.params.id));
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    return res.status(200).json({ employee });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/departments', async (req, res) => {
  try {
    const departments = await getDepartments();
    if (departments.length === 0) {
      return res.status(404).json({ error: 'No departments found' });
    }
    return res.json({ departments });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/departments/:id', async (req, res) => {
  try {
    const department = await getDepartmentById(parseInt(req.params.id));
    if (!department)
      return res.status(404).json({ error: 'Department not found' });
    return res.status(200).json({ department });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = {
  app,
  getDepartmentById,
  getDepartments,
  getEmployees,
  getEmployeeById,
};
