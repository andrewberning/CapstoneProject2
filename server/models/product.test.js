const db = require('../config/db');
const Product = require('../models/product');
const { NotFoundError } = require('../expressError');

describe('Product Model', () => {
  // Mock the db.query method
  beforeEach(() => {
    db.query = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllProductsByCategoryId should return all products for a given category id', async () => {
    // Mock the result of the getAllProductsByCategoryId query
    db.query.mockResolvedValueOnce({
      rows: [
        { id: 1, name: 'Product 1', description: 'Description 1', price: 100, image_url: 'url1', stock: 10, category_id: 2 },
        { id: 2, name: 'Product 2', description: 'Description 2', price: 200, image_url: 'url2', stock: 20, category_id: 2 }
      ]
    });

    const products = await Product.getAllProductsByCategoryId(2);

    expect(products).toEqual([
      { id: 1, name: 'Product 1', description: 'Description 1', price: 100, image_url: 'url1', stock: 10, category_id: 2 },
      { id: 2, name: 'Product 2', description: 'Description 2', price: 200, image_url: 'url2', stock: 20, category_id: 2 }
    ]);

    expect(db.query).toHaveBeenCalledWith(
      `SELECT id, name, description, price, image_url, stock, category_id
       FROM products 
       WHERE category_id = $1`, [2]
    );
  });

  test('getProduct should return a product by its id', async () => {
    // Mock the result of the getProduct query
    db.query.mockResolvedValueOnce({
      rows: [{ id: 1, name: 'Product 1', description: 'Description 1', price: 100, image_url: 'url1', stock: 10, category_id: 2 }]
    });

    const product = await Product.getProduct(1);

    expect(product).toEqual({
      id: 1, name: 'Product 1', description: 'Description 1', price: 100, image_url: 'url1', stock: 10, category_id: 2
    });

    expect(db.query).toHaveBeenCalledWith(
      `SELECT id, name, description, price, image_url, stock, category_id
       FROM products
       WHERE id = $1`, [1]
    );
  });

  test('getProduct should throw NotFoundError if no product is found', async () => {
    db.query.mockResolvedValueOnce({ rows: [] });
  
    await expect(Product.getProduct(999)).rejects.toThrow(NotFoundError);
    await expect(Product.getProduct(999)).rejects.toThrow('Product Not Found');
  
    expect(db.query).toHaveBeenCalledWith(
      `SELECT id, name, description, price, image_url, stock, category_id
       FROM products
       WHERE id = $1`, [999]
    );
  });
  

  test('find should return products that match the search term', async () => {
    // Mock the result of the find query
    db.query.mockResolvedValueOnce({
      rows: [
        { id: 1, name: 'Product 1', description: 'Description 1', price: 100, image_url: 'url1', stock: 10, category_id: 2 },
        { id: 2, name: 'Special Product', description: 'Description 2', price: 200, image_url: 'url2', stock: 20, category_id: 2 }
      ]
    });

    const products = await Product.find('Special');

    expect(products).toEqual([
      { id: 1, name: 'Product 1', description: 'Description 1', price: 100, image_url: 'url1', stock: 10, category_id: 2 },
      { id: 2, name: 'Special Product', description: 'Description 2', price: 200, image_url: 'url2', stock: 20, category_id: 2 }
    ]);

    expect(db.query).toHaveBeenCalledWith(
      `SELECT id, name, description, price, image_url, stock, category_id
       FROM products
       WHERE name ILIKE $1`, ['%Special%']
    );
  });

  test('find should throw NotFoundError if no products are found', async () => {
    db.query.mockResolvedValueOnce({ rows: [] });
  
    await expect(Product.find('Nonexistent')).rejects.toThrow(NotFoundError);
    await expect(Product.find('Nonexistent')).rejects.toThrow('Product Not Found');
  
    expect(db.query).toHaveBeenCalledWith(
      `SELECT id, name, description, price, image_url, stock, category_id
       FROM products
       WHERE name ILIKE $1`, ['%Nonexistent%']
    );
  });
  
});
