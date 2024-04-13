const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const userController = require("../controllers/user");
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

describe("User Controller", () => {
  const token = "testpassword";
  describe("signupUser", () => {
    it("should sign up a new user and return a token", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "testpassword",
        },
      };

      const { email, password } = req.body;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock the User.signup function
      User.signup = jest.fn().mockResolvedValue({
        _id: "testUserId",
        email: "test@example.com",
      });

      const user = await User.signup(email, password);

      // Mock the createToken function
      const token = createToken(user._id);

      await userController.signupUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        email: "test@example.com",
        token: token,
      });

      // Verify that User.signup and createToken functions were called with the correct arguments
      expect(User.signup).toHaveBeenCalledWith(
        "test@example.com",
        token,
      );
      expect(createToken).toHaveBeenCalledWith("testUserId");
    });

    it("should handle errors and return a 400 status with error message", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "testpassword",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock the User.signup function to throw an error
      User.signup = jest.fn().mockRejectedValue(new Error("Signup failed"));

      await userController.signupUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Signup failed",
      });

      // Verify that User.signup function was called with the correct arguments
      expect(User.signup).toHaveBeenCalledWith(
        "test@example.com",
        "testpassword"
      );
    });
  });
  
  describe("loginUser", () => {
    it("should log in a user and return a token", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "testpassword",
        },
      };

      const { email, password } = req.body;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock the User.login function
      User.login = jest.fn().mockResolvedValue({
        _id: "testUserId",
        email: "test@example.com",
      });

      const user = await User.login(email, password);

      // Mock the createToken function
      const token = createToken(user._id);

      await userController.loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        email: "test@example.com",
        token: token
      });

      // Verify that User.login and createToken functions were called with the correct arguments
      expect(User.login).toHaveBeenCalledWith(
        "test@example.com",
        token,
      );
      expect(createToken).toHaveBeenCalledWith("testUserId");
    });

    it("should handle errors and return a 400 status with error message", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "testpassword",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock the User.login function to throw an error
      User.login = jest.fn().mockRejectedValue(new Error("Login failed"));

      await userController.loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Login failed",
      });

      // Verify that User.login function was called with the correct arguments
      expect(User.login).toHaveBeenCalledWith(
        "test@example.com",
        token
      );
    });
  });
});
