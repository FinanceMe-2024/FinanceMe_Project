const request = require('supertest');
const Income = require('../models/IncomeModel');

describe('Income Controller', () => {
  describe('addIncome', () => {
    it('should add a new income', async () => {
      const incomeData = {
        title: 'Test Income',
        amount: 100,
        category: 'Salary',
        description: 'Test income description',
        date: '2024-04-08T05:00:00.000Z',
        userId: '65fdf9aa8abacb09e060bbae'
      };

      const response = await request('https://financeme-project-1.onrender.com/api/v1/add-income')
        .post(incomeData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Income Added');
    });

    it('should return an error if any required field is missing', async () => {
      const incompleteIncome = {
        amount: 50,
        category: 'Salary',
        description: 'Test income description',
        date: '2024-04-08T05:00:00.000Z',
        userId: '65fdf9aa8abacb09e060bbae'
      };

      const response = await request('https://financeme-project-1.onrender.com/api/v1/add-income')
        .post(incompleteIncome);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('message', 'All fields are required!');
    });

    it('should return an error if amount is not a positive number', async () => {
      const invalidIncome = {
        title: 'Test Income',
        amount: -50,
        category: 'Salary',
        description: 'Test income description',
        date: '2024-04-08T05:00:00.000Z',
        userId: '65fdf9aa8abacb09e060bbae'
      };

      const response = await request('https://financeme-project-1.onrender.com/api/v1/add-income')
        .post(invalidIncome);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('message', 'Amount must be a positive number!');
    });

    it('should return an error if amount is not a number', async () => {
      const invalidIncome = {
        title: 'Test Income',
        amount: 'invalid',
        category: 'Salary',
        description: 'Test income description',
        date: '2024-04-08T05:00:00.000Z',
        userId: '65fdf9aa8abacb09e060bbae'
      };

      const response = await request('https://financeme-project-1.onrender.com/api/v1/add-income')
        .post(invalidIncome);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('message', 'Amount must be a number!');
    });
  });

  describe('getIncomes', () => {
    it('should get incomes by user ID', async () => {
      const userId = '65fdf9aa8abacb09e060bbae';

      const income = new Income({
        title: 'Test Income',
        amount: 100,
        category: 'Salary',
        description: 'Test income description',
        date: '2024-04-08T05:00:00.000Z',
        user: '65fdf9aa8abacb09e060bbae'
      });

      await income.save();

      const response = await request('https://financeme-project-1.onrender.com/api/v1/get-incomes').get(`/api/income/${userId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('incomes');
    });

    it('should return 404 if user has no incomes', async () => {
      const nonExistingUserId = '27';

      const response = await request('https://financeme-project-1.onrender.com/api/v1/get-incomes').get(`/api/income/${nonExistingUserId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('message', 'User has no incomes');
    });
  });

  describe('deleteIncome', () => {
    it('should delete an income', async () => {
      const income = new Income({
        title: 'Test Income',
        amount: 100,
        category: 'Salary',
        description: 'Test income description',
        date: '2024-04-08T05:00:00.000Z',
        user: '1'
      });

      await income.save();

      const response = await request('https://financeme-project-1.onrender.com/api/v1/delete-income')
        .delete(`/api/income/${income._id}`)
        .set('user_id', '1');

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Income Deleted');
    });

    it('should return 404 if income is not found', async () => {
      const nonExistingIncomeId = '27';

      const response = await request('https://financeme-project-1.onrender.com/api/v1/delete-income')
        .delete(`/api/income/${nonExistingIncomeId}`)
        .set('user_id', '1');

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('message', 'Income not found');
    });

    it('should return 403 if user does not have permission to delete the income', async () => {
      const income = new Income({
        title: 'Test Income',
        amount: 100,
        category: 'Salary',
        description: 'Test income description',
        date: '2024-04-08T05:00:00.000Z',
        user: '3'
      });
    
      await income.save();
    
      const response = await request('https://financeme-project-1.onrender.com/api/v1/delete-income')
        .delete(`/api/income/${income._id}`)
        .set('user_id', '1');
    
      expect(response.statusCode).toBe(403);
      expect(response.body).toHaveProperty('message', 'You do not have permission to delete this income');
    });
  });
});