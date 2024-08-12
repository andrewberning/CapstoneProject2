const request = require('supertest');
const express = require('express');
const authRouter = require('./auth');
const app = express();
const jwt = require('jsonwebtoken');
const { UnauthorizedError, BadRequestError } = require('../expressError');

// Use the authRouter in the express app
app.use(express.json());
app.use('/auth', authRouter);

// Mocking the authController methods
const authController = require('../controllers/authController');
jest.mock('../controllers/authController');

describe('Auth Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /auth/token', () => {
    it('should return a JWT token for valid credentials', async () => {
      const mockToken = 'mocked.jwt.token';
      const mockUser = { username: 'testuser', password: 'password' };

      authController.login.mockResolvedValueOnce({ token: mockToken });

      const response = await request(app)
        .post('/auth/token')
        .send(mockUser);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ token: mockToken });
      expect(authController.login).toHaveBeenCalledWith(expect.anything(), mockUser);
    });

    it('should return UnauthorizedError for invalid credentials', async () => {
      const mockUser = { username: 'testuser', password: 'wrongpassword' };

      authController.login.mockRejectedValueOnce(new UnauthorizedError('Invalid username/password'));

      const response = await request(app)
        .post('/auth/token')
        .send(mockUser);

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid username/password');
    });
  });

  describe('POST /auth/register', () => {
    it('should register a new user and return a JWT token', async () => {
      const mockToken = 'mocked.jwt.token';
      const newUser = {
        username: 'newuser',
        password: 'password',
        firstName: 'New',
        lastName: 'User',
        email: 'newuser@example.com'
      };

      authController.register.mockResolvedValueOnce({ token: mockToken });

      const response = await request(app)
        .post('/auth/register')
        .send(newUser);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ token: mockToken });
      expect(authController.register).toHaveBeenCalledWith(expect.anything(), newUser);
    });

    it('should return BadRequestError for duplicate email', async () => {
      const newUser = {
        username: 'newuser',
        password: 'password',
        firstName: 'New',
        lastName: 'User',
        email: 'existinguser@example.com'
      };

      authController.register.mockRejectedValueOnce(new BadRequestError('Duplicate email'));

      const response = await request(app)
        .post('/auth/register')
        .send(newUser);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Duplicate email');
    });
  });
});
