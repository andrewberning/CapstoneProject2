const request = require('supertest');
const express = require('express');
const cartRouter = require('./cart');
const app = express();

// Use the cartRouter in the express app
app.use(express.json());
app.use('/cart', cartRouter);

// Mocking the cartController methods
const cartController = require('../controllers/cartController');
jest.mock('../controllers/cartController');

describe('Cart Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /cart/item', () => {
    it('should add an item to the cart', async () => {
      const newItem = { productId: 1, quantity: 2 };

      cartController.addItemToCart.mockResolvedValueOnce(newItem);

      const response = await request(app)
        .post('/cart/item')
        .send(newItem);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(newItem);
      expect(cartController.addItemToCart).toHaveBeenCalledWith(expect.anything(), newItem);
    });
  });

  describe('GET /cart/:id', () => {
    it('should return cart items by cart ID', async () => {
      const cartId = 1;
      const mockCartItems = [{ id: 1, productId: 1, quantity: 2 }];

      cartController.getCart.mockResolvedValueOnce(mockCartItems);

      const response = await request(app)
        .get(`/cart/items/${cartId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCartItems);
      expect(cartController.getCart).toHaveBeenCalledWith(expect.anything(), cartId);
    });

    it('should return 404 if cart is not found', async () => {
      const cartId = 999;

      cartController.getCart.mockRejectedValueOnce(new NotFoundError('Cart not found'));

      const response = await request(app)
        .get(`/cart/items/${cartId}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Cart not found');
    });
  });

  describe('PATCH /cart/items/:id', () => {
    it('should update the quantity of an item in the cart', async () => {
      const itemId = 1;
      const updatedItem = { quantity: 5 };

      cartController.updateCartItemQuantity.mockResolvedValueOnce(updatedItem);

      const response = await request(app)
        .patch(`/cart/items/${itemId}`)
        .send(updatedItem);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedItem);
      expect(cartController.updateCartItemQuantity).toHaveBeenCalledWith(expect.anything(), itemId, updatedItem);
    });
  });

  describe('DELETE /cart/items/:id', () => {
    it('should remove an item from the cart', async () => {
      const itemId = 1;

      cartController.removeItemFromCart.mockResolvedValueOnce({ message: 'Item removed' });

      const response = await request(app)
        .delete(`/cart/item/${itemId}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Item removed');
      expect(cartController.removeItemFromCart).toHaveBeenCalledWith(expect.anything(), itemId);
    });
  });

  describe('DELETE /cart/items/:cartId', () => {
    it('should remove all items from the cart', async () => {
      const cartId = 1;

      cartController.removeItemsFromCart.mockResolvedValueOnce({ message: 'All items removed' });

      const response = await request(app)
        .delete(`/cart/items/${cartId}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('All items removed');
      expect(cartController.removeItemsFromCart).toHaveBeenCalledWith(expect.anything(), cartId);
    });
  });
});
