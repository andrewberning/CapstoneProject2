const request = require('supertest');
const app = require('../app'); // Your Express app
const Product = require('../models/product');

// Mock the Product model methods
jest.mock('../models/product');

describe('Product Controller', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /products/product/:id', () => {
    it('should return a product by ID', async () => {
      const mockProduct = { id: 1, name: "Product 1", price: 10.99 };
      Product.getProduct.mockResolvedValue(mockProduct);

      const response = await request(app)
        .get('/products/product/1')
        .expect(200);

      expect(response.body.product).toEqual(mockProduct);
      expect(Product.getProduct).toHaveBeenCalledWith('1');
    });
  });

  describe('GET /products/:id', () => {
    it('should return all products by category ID', async () => {
      const mockProducts = [
        { id: 1, name: "Product 1", price: 10.99 },
        { id: 2, name: "Product 2", price: 15.99 },
      ];
      Product.getAllProductsByCategoryId.mockResolvedValue(mockProducts);

      const response = await request(app)
        .get('/products/1')
        .expect(200);

      expect(response.body.products).toEqual(mockProducts);
      expect(Product.getAllProductsByCategoryId).toHaveBeenCalledWith('1');
    });
  });

  describe('GET /products/search?q=searchTerm', () => {
    it('should return products that match the search term', async () => {
      const mockProducts = [
        { id: 1, name: "Product 1", price: 10.99 },
        { id: 2, name: "Product 2", price: 15.99 },
      ];
      Product.find.mockResolvedValue(mockProducts);

      const response = await request(app)
        .get('/products/search?q=Product')
        .expect(200);

      expect(response.body.products).toEqual(mockProducts);
      expect(Product.find).toHaveBeenCalledWith('Product');
    });
  });
});