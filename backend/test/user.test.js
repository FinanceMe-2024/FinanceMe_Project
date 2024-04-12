const User = require('../models/UserModel.js');
const { createToken } = require('../utils/token');
const userController = require('../controllers/user.js');

describe('User Controller', () => {
  describe('signupUser', () => {
    it('should sign up a new user and return a token', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'testpassword'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Mock the User.signup function
      User.signup = jest.fn().mockResolvedValue({
        _id: 'testUserId',
        email: 'test@example.com'
      });

      // Mock the createToken function
      createToken = jest.fn().mockReturnValue('testToken');

      await userController.signupUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        email: 'test@example.com',
        token: 'testToken'
      });

      // Verify that User.signup and createToken functions were called with the correct arguments
      expect(User.signup).toHaveBeenCalledWith('test@example.com', 'testpassword');
      expect(createToken).toHaveBeenCalledWith('testUserId');
    });

    it('should handle errors and return a 400 status with error message', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'testpassword'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Mock the User.signup function to throw an error
      User.signup = jest.fn().mockRejectedValue(new Error('Signup failed'));

      await userController.signupUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Signup failed'
      });

      // Verify that User.signup function was called with the correct arguments
      expect(User.signup).toHaveBeenCalledWith('test@example.com', 'testpassword');
    });
  });
});