const db = require('../config/db');
const Order = require('../models/order');
const { BadRequestError } = require('../expressError');

describe('Order Model', () => {
  // Mock the db.query method
  beforeEach(() => {
    db.query = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('create should create an order and insert items', async () => {
    // Mock the result of the order creation query
    db.query
      .mockResolvedValueOnce({
        rows: [{ id: 1, user_id: 2, total_items: 3, total_amount: 100, status: 'pending', address: '123 St', city: 'City', state: 'State', zip: '12345', country: 'Country' }]
      })
      .mockResolvedValueOnce({ rows: [] }); // Mock the result of the order_items insertion queries

    const cartItems = [
      { product_id: 1, quantity: 2, price: 10 },
      { product_id: 2, quantity: 1, price: 20 }
    ];
    const orderData = {
      cartItems,
      userId: 2,
      totalItems: 3,
      totalAmount: 100,
      name: 'John Doe',
      address: '123 St',
      city: 'City',
      state: 'State',
      zip: '12345',
      country: 'Country'
    };

    const result = await Order.create(orderData);

    expect(result).toEqual({
      id: 1,
      user_id: 2,
      total_items: 3,
      total_amount: 100,
      status: 'pending',
      address: '123 St',
      city: 'City',
      state: 'State',
      zip: '12345',
      country: 'Country'
    });

    expect(db.query).toHaveBeenCalledWith(
      `INSERT INTO orders (user_id, name, total_items, total_amount, address, city, state, zip, country)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, user_id, total_items, total_amount, status, address, city, state, zip, country`,
      [2, 'John Doe', 3, 100, '123 St', 'City', 'State', '12345', 'Country']
    );

    expect(db.query).toHaveBeenCalledTimes(cartItems.length + 1); // One call for creating order + one call for each cart item
  });

  test('findAllByUserId should return all orders for a user', async () => {
    // Mock the result of the findAllByUserId query
    db.query.mockResolvedValueOnce({
      rows: [
        { id: 1, user_id: 2, name: 'Order 1', address: 'Address 1', city: 'City', state: 'State', zip: '12345', total_amount: 100, created_at: '2024-08-11T00:00:00Z' },
        { id: 2, user_id: 2, name: 'Order 2', address: 'Address 2', city: 'City', state: 'State', zip: '67890', total_amount: 200, created_at: '2024-08-12T00:00:00Z' }
      ]
    });

    const orders = await Order.findAllByUserId(2);

    expect(orders).toEqual([
      { id: 1, user_id: 2, name: 'Order 1', address: 'Address 1', city: 'City', state: 'State', zip: '12345', total_amount: 100, created_at: '2024-08-11T00:00:00Z' },
      { id: 2, user_id: 2, name: 'Order 2', address: 'Address 2', city: 'City', state: 'State', zip: '67890', total_amount: 200, created_at: '2024-08-12T00:00:00Z' }
    ]);

    expect(db.query).toHaveBeenCalledWith(
      `SELECT id, user_id, name, address, city, state, zip, total_amoutn, created_at
       FROM orders
       WHERE user_id = $1`,
       [2]
    );
  });
});
