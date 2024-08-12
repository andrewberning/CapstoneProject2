const db = require("../config/db");
const bcrypt = require("bcrypt");
const User = require("./user");
const Cart = require("./cart");
const { NotFoundError, BadRequestError, UnauthorizedError } = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require("../config/config");

jest.mock("../config/db");
jest.mock("bcrypt");
jest.mock("./cart");

describe('User Model', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('authenticate', () => {
    it('should authenticate a user with correct username and password', async () => {
      const mockUser = {
        username: 'testuser',
        password: await bcrypt.hash('password', BCRYPT_WORK_FACTOR),
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com'
      };

      db.query.mockResolvedValueOnce({ rows: [mockUser] });
      bcrypt.compare.mockResolvedValueOnce(true);

      const user = await User.authenticate('testuser', 'password');
      expect(user).toEqual({
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com'
      });
    });

    it('should throw UnauthorizedError if username is incorrect', async () => {
      db.query.mockResolvedValueOnce({ rows: [] });

      await expect(User.authenticate('wronguser', 'password')).rejects.toThrow(UnauthorizedError);
    });

    it('should throw UnauthorizedError if password is incorrect', async () => {
      const mockUser = {
        username: 'testuser',
        password: await bcrypt.hash('password', BCRYPT_WORK_FACTOR)
      };

      db.query.mockResolvedValueOnce({ rows: [mockUser] });
      bcrypt.compare.mockResolvedValueOnce(false);

      await expect(User.authenticate('testuser', 'wrongpassword')).rejects.toThrow(UnauthorizedError);
    });
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const newUser = {
        username: 'newuser',
        password: 'password',
        firstName: 'New',
        lastName: 'User',
        email: 'newuser@example.com'
      };

      db.query.mockResolvedValueOnce({ rows: [] }); // No existing user with the email
      db.query.mockResolvedValueOnce({
        rows: [{
          id: 1,
          username: 'newuser',
          firstName: 'New',
          lastName: 'User',
          email: 'newuser@example.com'
        }]
      });
      bcrypt.hash.mockResolvedValueOnce('hashedpassword');

      const user = await User.register(newUser);
      expect(user).toEqual({
        id: 1,
        username: 'newuser',
        firstName: 'New',
        lastName: 'User',
        email: 'newuser@example.com'
      });
    });

    it('should throw BadRequestError if email already exists', async () => {
      db.query.mockResolvedValueOnce({ rows: [{ id: 1 }] }); // Existing user with the email

      await expect(User.register({
        username: 'newuser',
        password: 'password',
        firstName: 'New',
        lastName: 'User',
        email: 'existinguser@example.com'
      })).rejects.toThrow(BadRequestError);
    });
  });

  describe('get', () => {
    it('should get user details successfully', async () => {
      const userId = 1;
      const mockUser = {
        id: userId,
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com'
      };
      const mockCart = { id: 2 };

      db.query.mockResolvedValueOnce({ rows: [mockUser] });
      Cart.findByUserId.mockResolvedValueOnce(mockCart);
      db.query.mockResolvedValueOnce({
        rows: [{
          id: 1,
          product_id: 101,
          quantity: 2,
          name: 'Product1',
          description: 'Description1',
          price: 10.00,
          image_url: 'http://example.com/image1.jpg',
          category_id: 1
        }]
      });

      const user = await User.get('testuser');
      expect(user).toEqual({
        id: userId,
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        cartId: 2,
        cartItems: [{
          id: 1,
          product_id: 101,
          quantity: 2,
          name: 'Product1',
          description: 'Description1',
          price: 10.00,
          image_url: 'http://example.com/image1.jpg',
          category_id: 1
        }]
      });
    });

    it('should throw NotFoundError if user is not found', async () => {
      db.query.mockResolvedValueOnce({ rows: [] });

      await expect(User.get('nonexistentuser')).rejects.toThrow(NotFoundError);
    });
  });
});
