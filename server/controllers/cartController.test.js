const request = require("supertest");
const app = require("../app");
const db = require("../config/db");
const Cart = require("../models/cart");
const CartItem = require("../models/cartItem");

jest.mock("../models/cart");
jest.mock("../models/cartItem");

describe("Cart Controller", () => {
  describe("POST /cart/items", () => {
    it("should add an item to the cart", async () => {
      Cart.findByUserId.mockResolvedValue({ id: 1 });
      CartItem.create.mockResolvedValue({
        id: 1,
        cart_id: 1,
        product_id: 1,
        price: 100,
        quantity: 2,
      });
  
      const response = await request(app)
        .post("/cart/item")
        .send({
          user: { id: 1 },
          item: { id: 1, price: 100 },
          quantity: 2,
        })
        .expect(201);
  
      expect(response.body.message).toBe("Item added to cart");
      expect(response.body.cartItem).toEqual({
        id: 1,
        cart_id: 1,
        product_id: 1,
        price: 100,
        quantity: 2,
      });
    });
  
    it("should return 404 if the cart is not found", async () => {
      Cart.findByUserId.mockResolvedValue(null);
  
      const response = await request(app)
        .post("/cart/item")
        .send({
          user: { id: 1 },
          item: { id: 1, price: 100 },
          quantity: 2,
        })
        .expect(404);
  
      expect(response.body.message).toBe("Cart not found");
    });
  
    it("should handle errors gracefully", async () => {
      Cart.findByUserId.mockRejectedValue(new Error("Database error"));
  
      const response = await request(app)
        .post("/cart/item")
        .send({
          user: { id: 1 },
          item: { id: 1, price: 100 },
          quantity: 2,
        })
        .expect(500);
  
      expect(response.body.message).toBe("Error adding item to cart");
    });
  });

  describe("GET /cart/items/:id", () => {
    it("should get the user's cart items", async () => {
      Cart.findByUserId.mockResolvedValue({ id: 1 });
      CartItem.findAllByCartId.mockResolvedValue([
        { id: 1, product_id: 1, price: 100, quantity: 2 },
      ]);
  
      const response = await request(app)
        .get("/cart/items/1")
        .expect(200);
  
      expect(response.body.items).toEqual([
        { id: 1, product_id: 1, price: 100, quantity: 2 },
      ]);
    });
  
    it("should return 404 if the cart is not found", async () => {
      Cart.findByUserId.mockResolvedValue(null);
  
      const response = await request(app)
        .get("/cart/items/1")
        .expect(404);
  
      expect(response.body.error.message).toBe("Cart not found");
    });
  });
  
  describe("PATCH /cart/items/:id", () => {
    it("should update the quantity of a cart item", async () => {
      CartItem.updateQuantity.mockResolvedValue({
        id: 1,
        product_id: 1,
        price: 100,
        quantity: 3,
      });
  
      const response = await request(app)
        .patch("/cart/items/1")
        .send({ quantity: 3 })
        .expect(200);
  
      expect(response.body.updatedItem).toEqual({
        id: 1,
        product_id: 1,
        price: 100,
        quantity: 3,
      });
    });
  });
});
