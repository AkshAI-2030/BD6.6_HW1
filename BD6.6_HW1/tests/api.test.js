const request = require('supertest');
const http = require('http');
const { app } = require('../index.js');
const {
  getDepartmentById,
  getDepartments,
  getEmployeeById,
  getEmployees,
} = require('../controllers');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getDepartments: jest.fn(),
  getDepartmentById: jest.fn(),
  getEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
}));

let server;
beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe('API Error Handling Test HW', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return a list of employees:', () => {
    const mockedEmployees = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        departmentId: 1,
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        departmentId: 2,
      },
    ];
    getEmployees.mockReturnValue(mockedEmployees);
    let result = getEmployees();
    expect(result).toEqual(mockedEmployees);
    expect(result.length).toBe(2);
  });

  test('should return Employee details:', () => {
    const mockEmployee = {
      employee: {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        departmentId: 1,
      },
    };
    getEmployeeById.mockReturnValue(mockEmployee);
    let result = getEmployeeById(1);
    expect(result).toEqual(mockEmployee);
  });
  //departments
  test('should return a list of departments:', () => {
    const mockDepartments = [
      { id: 1, name: 'Engineering' },
      { id: 2, name: 'Marketing' },
    ];
    getDepartments.mockReturnValue(mockDepartments);
    let result = getDepartments();
    expect(result).toEqual(mockDepartments);
    expect(result.length).toBe(2);
  });

  test('should return Department details:', () => {
    const mockDepartment = {
      department: {
        id: 1,
        name: 'Engineering',
      },
    };
    getDepartmentById.mockReturnValue(mockDepartment);
    let result = getDepartmentById(1);
    expect(result).toEqual(mockDepartment);
  });
});

describe('API Endpoint Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /employees should get all employees', async () => {
    const mockedEmployees = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        departmentId: 1,
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        departmentId: 2,
      },
    ];
    getEmployees.mockResolvedValue(mockedEmployees);

    const result = await request(server).get('/api/employees');
    expect(result.status).toBe(200);
    expect(result.body.employees).toEqual(mockedEmployees);
    expect(result.body.employees.length).toBe(2);
  });

  it('GET /employees/details/:id should get an employee by its ID', async () => {
    const mockEmployee = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      departmentId: 1,
    };
    getEmployeeById.mockResolvedValue(mockEmployee);

    const result = await request(server).get('/api/employees/1');
    expect(result.status).toBe(200);
    expect(result.body.employee).toEqual(mockEmployee);
  });
  //departments
  it('GET /departments should get all departmentes', async () => {
    const mockedDept = [
      { id: 1, name: 'Engineering' },
      { id: 2, name: 'Marketing' },
    ];
    getDepartments.mockResolvedValue(mockedDept);

    const result = await request(server).get('/api/departments');
    expect(result.status).toBe(200);
    expect(result.body.departments).toEqual(mockedDept);
    expect(result.body.departments.length).toBe(2);
  });

  it('GET /departments/details/:id should get an department by its ID', async () => {
    const mockDept = { id: 1, name: 'Engineering' };
    getDepartmentById.mockResolvedValue(mockDept);

    const result = await request(server).get('/api/departments/1');
    expect(result.status).toBe(200);
    expect(result.body.department).toEqual(mockDept);
  });
});
