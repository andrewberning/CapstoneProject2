const db = require("../config/db");
const Category = require("./category");
const { NotFoundError } = require("../expressError");

jest.mock("../config/db");

describe("Category Model", () => {
  // Mock the db.query method
  beforeEach(() => {
    db.query = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAll", () => {
    it("should return all categories ordered by name", async () => {
      const mockCategories = [
        { id: 1, name: "Books", image_url: "http://example.com/books.jpg" },
        { id: 2, name: "Electronics", image_url: "http://example.com/electronics.jpg" },
      ];

      db.query.mockResolvedValueOnce({ rows: mockCategories });

      const result = await Category.getAll();

      expect(result).toEqual(mockCategories);
      expect(db.query).toHaveBeenCalledWith(
        `SELECT id, name, image_url 
       FROM categories
       ORDER BY name`
      );
    });
  });

  describe("get", () => {
    it("should return a category by its name", async () => {
      const mockCategory = { id: 1, name: "Electronics", image_url: "http://example.com/electronics.jpg" };

      db.query.mockResolvedValueOnce({ rows: [mockCategory] });

      const result = await Category.get("Electronics");

      expect(result).toEqual(mockCategory);
      expect(db.query).toHaveBeenCalledWith(
        `SELECT id, name, image_url
       FROM categories
       WHERE name = $1`, 
       ["Electronics"]
      );
    });

    it('get should throw NotFoundError if the category is not found', async () => {
    db.query.mockResolvedValueOnce({ rows: [] });

    await expect(Category.get('NonexistentCategory'))
      .rejects
      .toThrow(NotFoundError);
    
    await expect(Category.get('NonexistentCategory'))
      .rejects
      .toThrow("Category Not Found: NonexistentCategory");

    expect(db.query).toHaveBeenCalledWith(
      `SELECT id, name, image_url
       FROM categories
       WHERE name = $1`,
      ['NonexistentCategory']
    );
  });
  });
});
