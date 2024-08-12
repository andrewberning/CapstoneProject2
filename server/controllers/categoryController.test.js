const request = require("supertest");
const app = require("../app");
const Category = require("../models/category");

jest.mock("../models/category"); // Mock the Category model

describe("Category Controller", () => {
  
  describe("GET /categories/:category", () => {
    it("should return the requested category", async () => {
      const mockCategory = { id: 1, name: "Electronics" };
      
      // Mock the Category.get method to return the mockCategory
      Category.get.mockResolvedValue(mockCategory);
      
      const response = await request(app)
        .get("/categories/Electronics")
        .expect(200);
      
      expect(response.body.category).toEqual(mockCategory);
      expect(Category.get).toHaveBeenCalledWith("Electronics");
    });
  });

  describe("GET /categories", () => {
    it("should return all categories", async () => {
      const mockCategories = [
        { id: 1, name: "Electronics" },
        { id: 2, name: "Books" }
      ];

      // Mock the Category.getAll method to return the mockCategories
      Category.getAll.mockResolvedValue(mockCategories);

      const response = await request(app)
        .get("/categories")
        .expect(200);

      expect(response.body.categories).toEqual(mockCategories);
      expect(Category.getAll).toHaveBeenCalled();
    });
  });

});
