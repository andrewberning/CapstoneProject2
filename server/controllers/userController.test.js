const request = require('supertest');
const app = require('../app'); // Your Express app
const User = require('../models/user');

// Mock the User model methods
jest.mock('../models/user');

describe('User Controller', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /users/:username', () => {
    it('should return a user by username', async () => {
      const mockUser = { username: "john_doe", firstName: "John", lastName: "Doe", email: "john@example.com" };
      User.get.mockResolvedValue(mockUser);

      const response = await request(app)
        .get('/users/john_doe')
        .expect(200);

      expect(response.body.user).toEqual(mockUser);
      expect(User.get).toHaveBeenCalledWith('john_doe');
    });
  });
});