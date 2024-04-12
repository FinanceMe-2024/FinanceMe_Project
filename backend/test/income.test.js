const Income = require('../models/IncomeModel.js');
const incomeController = require('../controllers/income.js');

describe('Income Controller', () => {
  describe('createIncome', () => {
    it('should create a new income', async () => {
      const req = {
        body: {
          title: 'Test Income',
          amount: 200,
          category: 'Salary',
          description: 'Test income description',
          date: '2022-01-01',
          userId: 'testUserId'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await incomeController.createIncome(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Income created successfully',
        income: expect.any(Object)
      });

      // Verify that the income is saved in the database
      const savedIncome = await Income.findOne({ title: 'Test Income' });
      expect(savedIncome).toBeTruthy();
      expect(savedIncome.title).toBe('Test Income');
      expect(savedIncome.amount).toBe(200);
      expect(savedIncome.category).toBe('Salary');
      expect(savedIncome.description).toBe('Test income description');
      expect(savedIncome.date).toBe('2022-01-01');
      expect(savedIncome.user).toBe('testUserId');
    });
  });
});