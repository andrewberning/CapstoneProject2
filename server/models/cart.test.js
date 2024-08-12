const db = require("../config/db");
const Cart = require("./cart");

jest.mock("../config/db");

describe("Cart Model", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test for createCart method
  describe("createCart", () => {
    it("should create a new cart for a user and return the cart details", async () => {
      const user_id = 1;
      
      // Mocking the database response
      const mockCart = { id: 1, user_id: 1 };
      db.query.mockResolvedValueOnce({ rows: [mockCart] });
      
      const result = await Cart.createCart(user_id);
      
      expect(result).toEqual(mockCart);
      expect(db.query).toHaveBeenCalledWith(
        `INSERT INTO carts (user_id)
       VALUES ($1)
       RETURNING id, user_id`,
        [user_id]
      );
    });
  });

  // Test for findByUserId method
  describe("findByUserId", () => {
    it("should return a cart by the user ID", async () => {
      const user_id = 1;
      
      // Mocking the database response
      const mockCart = { id: 1, user_id: 1 };
      db.query.mockResolvedValueOnce({ rows: [mockCart] });
      
      const result = await Cart.findByUserId(user_id);
      
      expect(result).toEqual(mockCart);
      expect(db.query).toHaveBeenCalledWith(
        `SELECT id, user_id
       FROM carts
       WHERE user_id = $1`,
        [user_id]
      );
    });

    it("should return null if no cart is found for the user ID", async () => {
      const user_id = 999; // Assuming this ID doesn't exist
      
      // Mocking the database response to return an empty array
      db.query.mockResolvedValueOnce({ rows: [] });
      
      const result = await Cart.findByUserId(user_id);
      
      expect(result).toBeUndefined();
      expect(db.query).toHaveBeenCalledWith(
        `SELECT id, user_id
       FROM carts
       WHERE user_id = $1`,
        [user_id]
      );
    });
  });
});
