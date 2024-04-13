const request = require('supertest');

// URL de tu servicio desplegado
const baseURL = 'https://financeme-project-1.onrender.com/api/v1';

describe('Transactions API Endpoints', () => {
  let authToken; // Variable para almacenar el token de autenticación

  // Antes de todas las pruebas, inicia sesión y obtén el token de autenticación
  beforeAll(async () => {
    // Supongamos que tienes un endpoint para iniciar sesión y obtener un token
    const loginResponse = await request(baseURL)
      .post('/login') // Ruta para iniciar sesión
      .send({
        email: 'finance@gmail.com',
        password: 'Finance1.'
      });

    authToken = loginResponse.body.token; // Almacena el token de autenticación
  });

  it('should add a new income', async () => {
    const newIncome = {
      title: 'Salary',
      amount: 3000,
      category: 'Job',
      description: 'Monthly salary',
      date: '2024-04-15'
    };

    const response = await request(baseURL)
      .post('/add-income')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newIncome); // Envía el objeto de ingreso completo

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Income Added');
  });

  it('should return an error if any required field is missing', async () => {
    const incompleteIncome = {
      amount: 3000,
      category: 'Job',
      description: 'Monthly salary',
      date: '2024-04-15'
    };

    const response = await request(baseURL)
      .post('/add-income')
      .set('Authorization', `Bearer ${authToken}`)
      .send(incompleteIncome); // Envía el objeto de ingreso incompleto

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('All fields are required!');
  });

  it('should return an error if amount is not a positive number', async () => {
    const invalidIncome = {
      title: 'Salary',
      amount: -3000, // amount negativo
      category: 'Job',
      description: 'Monthly salary',
      date: '2024-04-15'
    };

    const response = await request(baseURL)
      .post('/add-income')
      .set('Authorization', `Bearer ${authToken}`)
      .send(invalidIncome); // Envía el objeto de ingreso con amount negativo

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Amount must be a positive number!');
  });

  it('should return an error if amount is not a number', async () => {
    const invalidIncome = {
      title: 'Salary',
      amount: '3000', // Esto debería ser una cadena, no un número
      category: 'Job',
      description: 'Monthly salary',
      date: '2024-04-15'
    };
  
    const response = await request(baseURL)
      .post('/add-income')
      .set('Authorization', `Bearer ${authToken}`)
      .send(invalidIncome);
  
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Amount must be a number!');
  });

  // Prueba para obtener todos los ingresos
  it('should get all incomes', async () => {
    const response = await request(baseURL)
      .get('/get-incomes')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Prueba para eliminar un ingreso
  it('should delete an income', async () => {
    // Supongamos que hay un ingreso existente con ID '123'
    const incomeIdToDelete = '661a165b91b53bfac9074087';

    const response = await request(baseURL)
      .delete(`/delete-income/${incomeIdToDelete}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Income Deleted');
  });
});
