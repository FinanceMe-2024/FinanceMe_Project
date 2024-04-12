const mongoose = require('mongoose');
const db = require('../db/db.js'); // Assuming your db.js file is in a folder named 'db'

// Replace with the actual connection string for your MongoDB test database
const testMongoUri = process.env.MONGO_URL;

describe('Database Connection', () => {
  // Connect to the test database before all tests
  beforeAll(async () => {
    await mongoose.connect(testMongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Disconnect from the test database after all tests
  afterEach(async () => {
    await mongoose.connection.close();
  });

  // Test case for successful connection
  it('should connect to the database', async () => {
    await db();
    expect(mongoose.connection.readyState).toBe(1); // 1 indicates connected
  });

  // Test case for connection error handling
  it('should log an error if the connection fails', async () => {
    // Mock the console.log function for testing
    console.log = jest.fn();

    // Set an invalid connection string to simulate an error
    process.env.MONGO_URL = 'invalid-url';

    await db();

    // Assert that the error message is logged
    expect(console.log).toHaveBeenCalledWith('DB Connection Error');
  });
});
