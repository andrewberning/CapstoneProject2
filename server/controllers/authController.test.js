const request = require('supertest');
const express = require('express');
const app = express();
const authController = require('./authController');
const User = require('../models/user');
const Cart = require('../models/cart');
const { BadRequestError } = require('../expressError');

jest.mock('../models/user');
jest.mock('../models/cart');
jest.mock('../helpers/tokens', () => ({
  createToken: jest.fn()
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Mock routes
app.post('/auth/token', authController.login);
app.post('/auth/register', authController.register);

describe('Auth Controller', () => {
  describe('POST /auth/token', () => {
    it('should return a token for valid credentials', async () => {
      const user = { username: 'testuser', firstName: 'Test', lastName: 'User', email: 'test@example.com' };
      const token = 'validtoken';
      
      User.authenticate.mockResolvedValueOnce(user);
      require('../helpers/tokens').createToken.mockReturnValueOnce(token);

      const response = await request(app)
        .post('/auth/token')
        .send({ username: 'testuser', password: 'password123' })
        .expect(200);
      
      expect(response.body).toEqual({ token });
    });
  });
});
