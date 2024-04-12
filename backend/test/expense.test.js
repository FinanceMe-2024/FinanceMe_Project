const request = require('supertest');
const Expense = require('../models/ExpenseModel');

describe('Expense Controller', () => {
  describe('addExpense', () => {
    it('should add a new expense', async () => {
      const expenseData = {
        title: 'Test Expense',
        amount: 100,
        category: 'Food',
        description: 'Test expense description',
        date: '2024-04-08T05:00:00.000Z',
        userId: '65fdf9aa8abacb09e060bbae'
      };

      const response = await request("https://financeme-project-1.onrender.com/api/v1/add-expense")
        .post(expenseData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Expense Added');
    });

    it('should return an error if any required field is missing', async () => {
      const incompleteExpense = {
        amount: 50,
        category: 'Alimentos',
        description: 'Gasto en almuerzo',
        date: '2024-04-08T05:00:00.000Z',
        userId: '65fdf9aa8abacb09e060bbae'
      };

      const response = await request("https://financeme-project-1.onrender.com/api/v1/add-expense")
        .post(incompleteExpense);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('message', 'All fields are required!');
    });

    it('should return an error if amount is not a positive number', async () => {
      const invalidExpense = {
        title: 'Comida',
        amount: -50,
        category: 'Alimentos',
        description: 'Gasto en almuerzo',
        date: '2024-04-08T05:00:00.000Z',
        userId: '65fdf9aa8abacb09e060bbae'
      };

      const response = await request("https://financeme-project-1.onrender.com/api/v1/add-expense")
        .post(invalidExpense);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('message', 'Amount must be a positive number!');
    });

    it('should return an error if amount is not a number', async () => {
      const invalidExpense = {
        title: 'Comida',
        amount: 'invalid',
        category: 'Alimentos',
        description: 'Gasto en almuerzo',
        date: '2024-04-08T05:00:00.000Z',
        userId: '65fdf9aa8abacb09e060bbae'
      };

      const response = await request("https://financeme-project-1.onrender.com/api/v1/add-expense")
        .post(invalidExpense);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('message', 'Amount must be a number!');
    });
  });

  describe('getExpense', () => {
    it('should get an expense by ID', async () => {
      const userId = '1';

      const expense = new Expense({
        title: 'Test Expense',
        amount: 100,
        category: 'Food',
        description: 'Test expense description',
        date: '2024-04-08T05:00:00.000Z',
        user: '65fdf9aa8abacb09e060bbae'
      });

      await expense.save();

      const response = await request("https://financeme-project-1.onrender.com/api/v1/get-expenses").get(`/api/expense/${expense._id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('expense');
    });

    it('should return 404 if expense is not found', async () => {
      const nonExistingExpenseId = '27';

      const response = await request("https://financeme-project-1.onrender.com/api/v1/get-expenses").get(`/api/expense/${nonExistingExpenseId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('message', 'Expense not found');
    });
  });

  describe('deleteExpense', () => {
    it('should return 403 if user does not have permission to delete the expense', async () => {
      const expense = new Expense({
        title: 'Test Expense',
        amount: 100,
        category: 'Food',
        description: 'Test expense description',
        date: '2024-04-08T05:00:00.000Z',
        user: '65fdf9aa8abacb09e060bbae'
      });
    
      await expense.save();
    
      const response = await request("https://financeme-project-1.onrender.com/api/v1/delete-expense")
        .delete(`/api/expense/${expense._id}`)
        .set('user_id', '1');
    
      expect(response.statusCode).toBe(403);
      expect(response.body).toHaveProperty('message', 'You do not have permission to delete this Expense');
    });
  });  
});