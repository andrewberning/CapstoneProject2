const db = require("../config/db");
const CartItem = require("./cartItem");
const { BadRequestError } = require("../expressError");

jest.mock("../config/db");

describe("CartItem Model", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test for create method
  describe("create", () => {
    it("should create a new cart item and return the item details", async () => {
      const cartItemData = {
        cart_id: 1,
        product_id: 101,
        quantity: 2,
        price: 19.99
      };

      // Mocking the database response
      const mockCartItem = { id: 1, ...cartItemData };
      db.query.mockResolvedValueOnce({ rows: [mockCartItem] });
      
      const result = await CartItem.create(cartItemData);
      
      expect(result).toEqual(mockCartItem);
      expect(db.query).toHaveBeenCalledWith(
        `INSERT INTO cart_items (cart_id, product_id, quantity, price)
       VALUES ($1, $2, $3, $4)
       RETURNING id, cart_id, product_id, quantity, price`,
        [cartItemData.cart_id, cartItemData.product_id, cartItemData.quantity, cartItemData.price]
      );
    });
  });

  // Test for findAllByCartId method
  describe("findAllByCartId", () => {
    it("should return all items in a specific cart", async () => {
      const cart_id = 1;
      
      // Mocking the database response
      const mockCartItems = [
        { id: 1, cart_id: 1, product_id: 101, quantity: 2, price: 19.99, name: "Product 1", description: "Description 1", image_url: "image1.jpg" },
        { id: 2, cart_id: 1, product_id: 102, quantity: 1, price: 9.99, name: "Product 2", description: "Description 2", image_url: "image2.jpg" }
      ];
      db.query.mockResolvedValueOnce({ rows: mockCartItems });
      
      const result = await CartItem.findAllByCartId(cart_id);
      
      expect(result).toEqual(mockCartItems);
      expect(db.query).toHaveBeenCalledWith(
        `SELECT ci.id, ci.cart_id, ci.product_id, ci.quantity, ci.price, p.name, p.description, p.image_url
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.cart_id = $1`,
      [cart_id]
      );
    });
  });

  // Test for updateQuantity method
  describe("updateQuantity", () => {
    it("should update the quantity of a specific cart item and return the updated item", async () => {
      const id = 1;
      const quantity = 3;
      
      // Mocking the database response
      const mockUpdatedCartItem = { id: 1, cart_id: 1, product_id: 101, quantity: 3, price: 19.99 };
      db.query.mockResolvedValueOnce({ rows: [mockUpdatedCartItem] });
      
      const result = await CartItem.updateQuantity(id, quantity);
      
      expect(result).toEqual(mockUpdatedCartItem);
      expect(db.query).toHaveBeenCalledWith(
        `UPDATE cart_items
       SET quantity = $1
       WHERE id = $2
       RETURNING id, cart_id, product_id, quantity, price`,
      [quantity, id]
      );
    });

    it("should throw BadRequestError if no cart item is found with the given id", async () => {
      const id = 999; // Assuming this ID doesn't exist
      const quantity = 3;

      // Mocking the database response to return an empty array
      db.query.mockResolvedValueOnce({ rows: [] });
      
      await expect(CartItem.updateQuantity(id, quantity)).rejects.toThrow(BadRequestError);
      expect(db.query).toHaveBeenCalledWith(
        `UPDATE cart_items
       SET quantity = $1
       WHERE id = $2
       RETURNING id, cart_id, product_id, quantity, price`,
      [quantity, id]
      );
    });
  });

  // Test for remove method
  describe("remove", () => {
    it("should remove a specific cart item and return the removed item id", async () => {
      const id = 1;
      
      // Mocking the database response
      const mockRemovedCartItem = { id: 1 };
      db.query.mockResolvedValueOnce({ rows: [mockRemovedCartItem] });
      
      const result = await CartItem.remove(id);
      
      expect(result).toEqual(mockRemovedCartItem);
      expect(db.query).toHaveBeenCalledWith(
        `DELETE FROM cart_items
       WHERE id = $1
       RETURNING id`,
      [id]
      );
    });

    it("should throw BadRequestError if no cart item is found with the given id", async () => {
      const id = 999; // Assuming this ID doesn't exist

      // Mocking the database response to return an empty array
      db.query.mockResolvedValueOnce({ rows: [] });
      
      await expect(CartItem.remove(id)).rejects.toThrow(BadRequestError);
      expect(db.query).toHaveBeenCalledWith(
        `DELETE FROM cart_items
       WHERE id = $1
       RETURNING id`,
      [id]
      );
    });
  });

  // Test for removeAllItems method
  describe("removeAllItems", () => {
    it("should remove all items from a specific cart", async () => {
      const cartId = 1;
      db.query.mockResolvedValueOnce({ rows: [{ id: 1 }, { id: 2 }] });
      
      const result = await CartItem.removeAllItems(cartId);
      
      expect(result).toEqual([{ id: 1 }, { id: 2 }]);
      expect(db.query).toHaveBeenCalledWith(
        `DELETE FROM cart_items
       WHERE cart_id = $1
       RETURNING id`,
        [cartId]
      );
    });

    it("should throw BadRequestError if no items are found with the given cart id", async () => {
      const cartId = 999;
      db.query.mockResolvedValueOnce({ rows: [] });
  
      await expect(CartItem.removeAllItems(cartId)).rejects.toThrow(BadRequestError);
      expect(db.query).toHaveBeenCalledWith(
        `DELETE FROM cart_items
       WHERE cart_id = $1
       RETURNING id`,
        [cartId]
      );
    });  
  });
});
