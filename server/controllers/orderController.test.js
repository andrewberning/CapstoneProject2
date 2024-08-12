const request = require('supertest');
const app = require('../app');
const { createPaypalOrder, capturePaypalOrder } = require('../services/paypal');
const Order = require('../models/order');
const { BadRequestError } = require("../expressError");

jest.mock('../models/order');
jest.mock('../services/paypal');

const mockOrderData = {
  name: "John Doe",
  address: "123 Main St",
  city: "Anytown",
  state: "CA",
  zip: "12345",
  country: "USA",
  cartItems: [
    {
      product_id: 1,
      quantity: 2
    },
    {
      product_id: 2,
      quantity: 1
    }
  ],
  totalItems: 3,  // Total number of items in the cart
  totalAmount: 59.99,  // Total cost of the items
  userId: 101  // ID of the user placing the order
};


describe('Order Controller', () => {
  it('should create a new order', async () => {
    Order.create.mockResolvedValue({ id: 1, ...mockOrderData });

    const response = await request(app)
      .post('/orders/create-order')
      .send({ mockOrderData })
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.order).toEqual({ id: 1, ...mockOrderData });
  });
});